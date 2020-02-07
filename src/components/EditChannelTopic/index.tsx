import React, { useState } from 'react';

import { Button, Form } from 'components';
import './styles.scss';

const EditChannelTopic: React.FC = () => {
  const [topic, setTopic] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // eslint-disable-next-line
    console.log(topic);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <textarea className="form__textarea" onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Set topic</Button>
    </Form>
  );
};

export default EditChannelTopic;
