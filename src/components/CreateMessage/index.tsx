import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import io from 'socket.io-client';

import { sendRequest } from 'api';
import { Form } from 'components';
import { AppState } from 'store';
import { addUserDirectMessage } from 'store/directMessages';
import { addMessage } from 'store/messages';
import { teammateConnected, teammateDisconnected } from 'store/teammates';
import { CreateMessageProps, UserConnected } from './types';
import './styles.scss';

const CreateMessage: React.FC<CreateMessageProps> = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const dispatch = useDispatch();
  const {
    currentChannel,
    currentTeammate,
    currentWorkspace,
    user,
  } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    currentWorkspace: state.currentWorkspace,
    user: state.user,
  }));
  const store = useStore();
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // TODO: move to a separate file so that it can be easily tested
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      // make sure the message isn't empty
      if (message.trim() === '') return;
      // clear the text from textarea
      setMessage('');

      try {
        let data: any;
        let url: string = '';
        // since the redux store expects messages to have an id(key prop)
        // use a random number until page refresh
        const randomNumber = Math.random();
        if (currentChannel.id && !currentTeammate.id && currentWorkspace.id) {
          url = '/messages';
          // data to send to the server in the request object
          data = {
            message: {
              channel: currentChannel.id,
              content: message.trim(),
              user: user.id,
            },
          };
          // dispatch action to add newly created message to the store
          dispatch(
            addMessage({
              ...data.message,
              id: randomNumber,
              createdAt: new Date().toISOString(),
              user: { username: user.username },
            })
          );
        } else if (
          currentTeammate.id &&
          !currentChannel.id &&
          currentWorkspace.id
        ) {
          url = '/direct-messages';
          data = {
            message: {
              content: message.trim(),
              user: currentTeammate.id,
              workspaceId: currentWorkspace.id,
            },
          };
          // dispatch action to add new created direct message
          dispatch(
            addUserDirectMessage({
              ...data.message,
              id: randomNumber,
              createdAt: new Date().toISOString(),
              user: { username: user.username },
            })
          );
        }

        // make sure there is an active socket open
        if (socket) {
          if (currentChannel.id && !currentTeammate.id) {
            socket.emit(
              'channel-message',
              JSON.stringify({
                id: randomNumber,
                content: data.message.content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                user: { username: user.username },
              })
            );
          }
          if (currentTeammate.id && !currentChannel.id) {
            // don't emit a message to yourself
            if (currentTeammate.id !== user.id) {
              socket.emit(
                'direct-message',
                JSON.stringify({
                  id: randomNumber,
                  content: data.message.content,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  user: { username: user.username },
                  workspaceId: currentWorkspace.id,
                })
              );
            }
          }
        }

        if (
          user.username !== 'stackguest' &&
          user.username !== 'stacktestuser'
        ) {
          await sendRequest({
            method: 'POST',
            url,
            data,
          });
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log('error in CreateMessage handleKeyUp: ', err);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.close();
    }

    const mySocket = io.connect(
      process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'
    );

    setSocket(mySocket);

    if (currentChannel.id && !currentTeammate.id) {
      mySocket.emit('user-connected', {
        channelName: `${currentWorkspace.id}:${currentWorkspace.name}-${currentChannel.id}-${currentChannel.name}`,
        username: user.username,
        workspaceName: `${currentWorkspace.id}:${currentWorkspace.name}`,
      });
    } else if (currentTeammate.id && !currentChannel.id) {
      // set up array with the ids of both users
      // then sort the array to get the unique(ids are unique per user) channel name
      const ids = [
        { id: user.id!, username: user.username },
        { id: currentTeammate.id!, username: currentTeammate.username },
      ];
      const channelName = ids.sort((a, b) => a.id - b.id);
      mySocket.emit('user-connected', {
        channelName: `${currentWorkspace.id}:${currentWorkspace.name}-${channelName[0].id}:${channelName[0].username}-${channelName[1].id}:${channelName[1].username}`,
        username: user.username,
        workspaceName: `${currentWorkspace.id}:${currentWorkspace.name}`,
      });
    }

    mySocket.on('user-connected', ({ usernames }: UserConnected) => {
      const interval = setInterval(() => {
        // getting the teammates directly from the store
        // when using 'useSelector' hook,
        // I get an teammates array is empty
        const { teammates } = store.getState();
        if (teammates.list.length > 0) {
          for (let i = 0; i < usernames.length; i += 1) {
            // eslint-disable-next-line no-continue
            if (usernames[i] === user.username) continue;
            dispatch(teammateConnected(usernames[i]));
          }
          clearInterval(interval);
        }
      }, 200);
    });

    mySocket.on('channel-message', (channelMessage: string) => {
      const parsedMessage = JSON.parse(channelMessage);
      // do nothing when the user emits the event
      if (parsedMessage.user.username === user.username) return;
      // add message to the store so that it's rendered
      dispatch(addMessage(parsedMessage));
    });
    mySocket.on('direct-message', (directMessage: string) => {
      const parsedMessage = JSON.parse(directMessage);
      // do nothing when the user emits the event
      if (parsedMessage.user.username === user.username) return;
      // update the store so that the new direct message will render
      dispatch(addUserDirectMessage(parsedMessage));
    });

    mySocket.on('user-disconnected', (username: string) => {
      // dispatch action to set the username to away status
      dispatch(teammateDisconnected(username));
    });
    // run before component unmounts
    // clean disconnect the socket
    return () => {
      // send message to let the server know user has disconnected
      mySocket.emit('user-disconnected', user.username);
      // close the connection
      mySocket.close();
    };
    // eslint-disable-next-line
  }, [currentChannel, currentTeammate]);

  return (
    <Form>
      <textarea
        className="message-textarea"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder={
          currentChannel.id
            ? `Message #${currentChannel.name}`
            : `Message #${currentTeammate.username}`
        }
        value={message}
      />
    </Form>
  );
};

export default CreateMessage;
