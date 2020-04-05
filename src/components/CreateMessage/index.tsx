import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import sendRequest from 'api';
import { Form } from 'components';
import { AppState } from 'store';
import { addMessage } from 'store/messages';
import { addUserDirectMessage } from 'store/directMessages';
import { CreateMessageProps } from './types';
import './styles.scss';

const CreateMessage: React.FC<CreateMessageProps> = () => {
  const dispatch = useDispatch();
  const { currentChannel, currentTeammateId, user } = useSelector(
    (state: AppState) => ({
      currentChannel: state.currentChannel,
      currentTeammateId: state.currentTeammateId,
      user: state.user,
    })
  );
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      try {
        let data: any;
        let url: string = '';
        if (currentChannel.id && !currentTeammateId) {
          url = '/messages';
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
              createdAt: new Date().toISOString(),
              user: { username: user.username },
            })
          );
        } else if (currentTeammateId && !currentChannel.id) {
          url = '/direct-messages';
          data = {
            message: {
              content: message,
              user: currentTeammateId,
            },
          };
          // dispatch action to add new created direct message
          dispatch(
            addUserDirectMessage({
              ...data.message,
              createdAt: new Date().toISOString(),
              user: { username: user.username },
            })
          );
        }

        // clear the text from textarea
        setMessage('');

        // const {
        //   data: { message: newMessage },
        // } =
        await sendRequest({
          method: 'POST',
          url,
          data,
        });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  };

  return (
    <Form>
      <textarea
        className="message-textarea"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder={currentChannel.id ? `Message #${currentChannel.name}` : ''}
        value={message}
      />
    </Form>
  );
};

export default CreateMessage;
