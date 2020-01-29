import React, { useState } from 'react';

import { Button, Form, Icon, Text } from 'components';
import { InvitePeopleFormProps, Username, UsernameValues } from './types';
import './styles.scss';

const InvitePeopleForm: React.FC<InvitePeopleFormProps> = () => {
  // variable used to map through the number of input fields
  const [usernames, setUsernames] = useState<Username[]>([
    {
      id: 1,
    },
  ]);
  // keep track of the user inputs
  const [values, setValues] = useState<UsernameValues>({
    'username-1': '',
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // eslint-disable-next-line
    console.log(values);
  };
  const handleDeleteInput = (e: React.SyntheticEvent) => {
    if (usernames.length > 1) {
      const usernameId = e.currentTarget.getAttribute('data-usernameid');
      const usernamesAfterDelete = usernames.filter(
        (u: Username) => u.id !== Number(usernameId)
      );

      setUsernames([...usernamesAfterDelete]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.name.split('-')[1]);

    setValues({
      ...values,
      [`username-${id}`]: e.target.value,
    });
  };

  return (
    <div className="invite-people-form">
      <Text className="invite-people-form__sub-header">
        Invite people who are part of your team.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="invite-people-form__group">
          {usernames.map((u: Username) => (
            <div
              key={Math.random() * Number(u.id)}
              className="invite-people-form__inner"
            >
              <Form.Input
                inputId={`username-${u.id}`}
                type="text"
                label="Username"
                value={values[`username-${u.id}`]}
                onChange={handleChange}
              />
              <Button
                type="button"
                color="transparent"
                onClick={handleDeleteInput}
                className="invite-people-form__delete-button"
                customAttribute={{ usernameId: `${u.id}` }}
              >
                <Icon
                  type="times"
                  size="sm"
                  className="invite-people-form__times-icon"
                />
              </Button>
            </div>
          ))}
        </Form.Group>
        <Button
          type="button"
          color="transparent"
          onClick={() => {
            setUsernames([
              ...usernames,
              {
                id: usernames.length + 1,
              },
            ]);
            setValues({
              ...values,
              [`username-${usernames.length + 1}`]: '',
            });
          }}
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
