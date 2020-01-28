import React, { useState } from 'react';

import { Button, Form, Icon, Text } from 'components';
import { InvitePeopleFormProps, Username } from './types';
import './styles.scss';

const InvitePeopleForm: React.FC<InvitePeopleFormProps> = () => {
  const [usernames, setUsernames] = useState<Username[]>([
    {
      id: 1,
      'username-1': '',
    },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // eslint-disable-next-line
    console.log(usernames);
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
    // eslint-disable-next-line
    console.log(e.target.name.split('-')[1]);
    // eslint-disable-next-line
    console.log(usernames);
  };

  return (
    <div className="invite-people-form">
      <Text className="invite-people-form__sub-header">
        Invite people who are part of your team.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="invite-people-form__group">
          {usernames.map((u: Username, i: number) => (
            <div key={`${u.name}${u.id}`} className="invite-people-form__inner">
              <Form.Input
                inputId={`username-${i + 1}`}
                type="text"
                label="Username"
                value={usernames[i][`username-${i}`] as string}
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
                [`username-${usernames.length + 1}`]: '',
              },
            ]);
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
