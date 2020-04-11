import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

// import sendRequest from 'api';
import { Form } from 'components';
import { AppState } from 'store';
import { addMessage } from 'store/messages';
import { addUserDirectMessage } from 'store/directMessages';
import { CreateMessageProps } from './types';
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
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      // clear the text from textarea
      setMessage('');

      try {
        let data: any;
        // let url: string = '';
        // since the redux store expects messages to have an id(key prop)
        // use a random number until page refresh
        const randomNumber = Math.random();
        if (currentChannel.id && !currentTeammate.id && currentWorkspace.id) {
          // url = '/messages';
          // data to send to the server in the request object
          data = {
            message: {
              channel: currentChannel.id,
              content: message,
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
          // url = '/direct-messages';
          data = {
            message: {
              content: message,
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

        // make sure their is an active socket open
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
                channelName: `${currentChannel.id}-${currentChannel.name}`,
              })
            );
          }
          if (currentTeammate.id && !currentChannel.id) {
            // don't emit a message to yourself
            if (currentTeammate.id !== user.id) {
              // set up array with the ids of both users
              // then sort the array to get the unique(ids are unique per user) channel name
              const ids = [
                { id: user.id!, username: user.username },
                { id: currentTeammate.id!, username: currentTeammate.username },
              ];
              const channelName = ids.sort((a, b) => a.id - b.id);
              socket.emit(
                'direct-message',
                JSON.stringify({
                  id: randomNumber,
                  content: data.message.content,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  user: { username: user.username },
                  workspaceId: currentWorkspace.id,
                  channelName: `${channelName[0].id}:${channelName[0].username}-${channelName[1].id}:${channelName[1].username}`,
                })
              );
            }
          }
        }

        // await sendRequest({
        //   method: 'POST',
        //   url,
        //   data,
        // });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const mySocket = io.connect('http://localhost:8080/namespace');
    setSocket(mySocket);
    if (currentChannel.id && !currentTeammate.id) {
      mySocket.emit('new-user', {
        username: user.username,
        channelName: `${currentChannel.id}-${currentChannel.name}`,
      });
    }
    if (currentTeammate.id && !currentChannel.id) {
      // set up array with the ids of both users
      // then sort the array to get the unique(ids are unique per user) channel name
      const ids = [
        { id: user.id!, username: user.username },
        { id: currentTeammate.id!, username: currentTeammate.username },
      ];
      const channelName = ids.sort((a, b) => a.id - b.id);
      mySocket.emit('new-user', {
        username: user.username,
        channelName: `${channelName[0].id}:${channelName[0].username}-${channelName[1].id}:${channelName[1].username}`,
      });
    }
    mySocket.on('new-user', (data: any) => {
      // eslint-disable-next-line
      console.log('new-user', data);
    });
    mySocket.on('channel-message', (channelMessage: any) => {
      // eslint-disable-next-line
      console.log('channel-message', JSON.parse(channelMessage));
      dispatch(addMessage(JSON.parse(channelMessage)));
    });
    mySocket.on('direct-message', (channelMessage: any) => {
      // eslint-disable-next-line
      console.log('direct-message', JSON.parse(channelMessage));
      dispatch(addUserDirectMessage(JSON.parse(channelMessage)));
    });
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
