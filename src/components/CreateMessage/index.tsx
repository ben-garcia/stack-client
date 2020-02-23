import React, { useState } from 'react';

import { Form } from 'components';
import { CreateMessageProps } from './types';
import './styles.scss';

const CreateMessage: React.FC<CreateMessageProps> = () => {
  const [message, setMessage] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        className="form__textarea"
        onChange={handleChange}
        value={message}
      />
    </Form>
  );
};

export default CreateMessage;
