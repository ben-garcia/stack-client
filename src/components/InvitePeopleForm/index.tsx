import React, { useState } from 'react';

import { Button, Form, Icon, Text } from 'components';
import { InvitePeopleFormProps, Username } from './types';
import './styles.scss';

const InvitePeopleForm: React.FC<InvitePeopleFormProps> = () => {
  const [numberOfInputs, setNumberOfInputs] = useState<number>(1);
  const [usernames, setUsernames] = useState<{ [key: string]: Username }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // eslint-disable-next-line
    console.log(usernames);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernames({
      [e.target.name]: {
        id: Number(e.target.name.split('-')[1]),
        name: e.target.value,
      },
    });
  };

  const FormInputs: React.ReactNode[] = [];

  for (let i = 0; i < numberOfInputs; i += 1) {
    FormInputs.push(
      <div key={i} className="invite-people-form__inner">
        <Form.Input
          inputId={`username-${i}`}
          type="text"
          label="Username"
          onChange={handleChange}
        />
        <Button
          type="button"
          color="transparent"
          onClick={() => setNumberOfInputs(prev => prev - 1)}
          className="invite-people-form__delete-button"
        >
          <Icon
            type="times"
            size="sm"
            className="invite-people-form__times-icon"
          />
        </Button>
      </div>
    );
  }

  return (
    <div className="invite-people-form">
      <Text className="invite-people-form__sub-header">
        Invite people who are part of your team.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Form.Group flexDirection="column">{FormInputs}</Form.Group>
        <Button
          type="button"
          color="transparent"
          onClick={() => setNumberOfInputs(prev => prev + 1)}
          className="invite-people-form__add-input-button"
        >
          <Icon
            type="plus"
            size="sm"
            className="invite-people-form__plus-icon"
          />
          <Text tag="span" size="sm" className="invite-people-form__add-text">
            Add another
          </Text>
        </Button>
        <Text className="invite-people-form__message">
          New members will automatically join #general, and #random channels.
        </Text>
        <Button type="submit">Send Invitations</Button>
      </Form>
    </div>
  );
};

export default InvitePeopleForm;
