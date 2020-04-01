import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import sendRequest from 'api';
import { Form } from 'components';
import { AppState } from 'store';
import { addMessage } from 'store/messages';
import { CreateMessageProps } from './types';
import './styles.scss';

const CreateMessage: React.FC<CreateMessageProps> = () => {
  const dispatch = useDispatch();
  const { currentChannel, user } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    user: state.user,
  }));
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && currentChannel.id) {
      try {
        // data to send to the server in the request object
        const data: any = {
          message: {
            channel: currentChannel.id,
            content: message,
            user: user.id,
          },
        };

        const {
          data: { message: newMessage },
        } = await sendRequest({
          method: 'POST',
          url: '/messages',
          data,
        });

        // clear the text from textarea
        setMessage('');
        // add user object with username of the current user id
        newMessage.user = { username: user.username };
        // dispatch action to add newly created message to the store
        dispatch(addMessage(newMessage));
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
