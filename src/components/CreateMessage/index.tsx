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
  const { currentChannelId, userId } = useSelector((state: AppState) => ({
    currentChannelId: state.currentChannel.id,
    userId: state.user.id,
  }));
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      try {
        // data to send to the server in the request object
        const data: any = {
          message: {
            channel: currentChannelId,
            content: message,
            user: userId,
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
        value={message}
      />
    </Form>
  );
};

export default CreateMessage;
