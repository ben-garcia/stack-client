import React, { useState } from 'react';

import { Button, Form } from 'components';
import sendRequest from 'api';
import { Channel, ChannelErrors, CreateChannelFormProps } from './types';

const CreateChannelForm: React.FC<CreateChannelFormProps> = () => {
  const [channel, setChannel] = useState<Channel>({
    name: '',
    description: '',
    public: false,
  });
  const [errors, setErrors] = useState<ChannelErrors>({
    name: '',
    description: '',
  });
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if no errors then enable submit button
    if (errors.description === '' && errors.name === '') {
      setDisableButton(false);
    }

    if (e.target.value === '') {
      setErrors({
        ...errors,
        [e.target.name]: 'required',
      });
    }

    setChannel({
      ...channel,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await sendRequest({
        method: 'POST',
        url: '/channels',
        data: {
          ...channel,
        },
      });
      // eslint-disable-next-line
      console.log(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.log('handleSubmit error: ', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group flexDirection="column">
        <Form.Input
          onChange={handleChange}
          inputId="name"
          type="text"
          label="name"
          value={channel.name}
          error={errors.name}
        />
        <Form.Input
          onChange={handleChange}
          inputId="description"
          type="text"
          label="description"
          value={channel.description}
          error={errors.description}
        />
      </Form.Group>
      <Button type="submit" disabled={disableButton}>
        Create
      </Button>
    </Form>
  );
};

export default CreateChannelForm;