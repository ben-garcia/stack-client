import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form, Icon, Text } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { addTeammate } from 'store/teammates/actions';
import { Teammate } from 'store/teammates/types';
import { InvitePeopleFormProps, Username, UsernameValues } from './types';
import './styles.scss';

const InvitePeopleForm: React.FC<InvitePeopleFormProps> = ({
  setInvitePeopleFormIsOpen,
}) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: AppState) => ({
    username: state.user.username,
  }));
  // variable used to map through the number of input fields
  const [usernames, setUsernames] = useState<Username[]>([
    {
      id: 1,
      key: Math.random() * 100,
      visible: true,
    },
  ]);
  // keep track of the user inputs
  const [values, setValues] = useState<UsernameValues>({
    'username-1': '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isSubmittable: boolean = false;
    const invalidIds: number[] = [];
    usernames
      .filter(u => !u.visible)
      .forEach(u => {
        invalidIds.push(u.id);
      });

    // add ids of those usernames that aren't at least 5 characters
    // or the username entered is equal to the owner of the workspace
    // to the invalidIds array.
    Object.entries(values).forEach(([key, value]) => {
      if (value.length < 6 || value === username) {
        invalidIds.push(Number(key[key.length - 1]));
      }
    });

    // copy of the state
    const members = { ...values };

    // loop through the members array and delete
    // those usernames that the usernames has removed.
    invalidIds.forEach((i: number) => {
      delete members[`username-${i}`];
    });

    // make sure inputs have values before submitting
    Object.values(members).forEach((value: string) => {
      if (value.length !== 0) {
        isSubmittable = true;
      }
    });

    if (isSubmittable) {
      try {
        const {
          data: { teammates },
        } = await sendRequest({
          method: 'PUT',
          url: `/workspaces/1`,
          data: members,
        });

        // loop through each teamate returned from the server
        // which are the teammates added.
        teammates.forEach((teammate: Teammate) => {
          // dispatch action to add new teammate
          dispatch(addTeammate(teammate));
        });
        // close the modal
        setInvitePeopleFormIsOpen(false);
      } catch (err) {
        // eslint-disable-next-line
        console.log('InvitePeopleForm handleSubmit error: ', err);
      }
    }
  };

  const hideInput = (e: React.SyntheticEvent) => {
    if (usernames.length > 1) {
      const usernameId = Number(
        e.currentTarget.getAttribute('data-usernameid')
      );
      // find the correct username from the state
      const usernameToDismiss = usernames.find(
        (u: Username) => u.id === usernameId
      );
      // make sure it isn't rendered
      // as the user has choosen to remove it
      usernameToDismiss!.visible = false;

      setUsernames([...usernames]);
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
          {usernames.map(
            (u: Username) =>
              u.visible && (
                <div
                  key={`${u.key}--${u.id}`}
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
                    onClick={hideInput}
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
              )
          )}
        </Form.Group>
        <Button
          type="button"
          color="transparent"
          onClick={() => {
            setUsernames([
              ...usernames,
              {
                id: usernames.length + 1,
                key: Math.random() * (usernames.length + 100),
                visible: true,
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
