import React, { useState } from 'react';

import { Form } from 'components';
import { CreateMessageProps } from './types';
import './styles.scss';

const CreateMessage: React.FC<CreateMessageProps> = () => {
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      // eslint-disable-next-line
      console.log('submit');
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
