import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Form, Icon, Text } from 'components';
import { AppState } from 'store';
import { Member } from 'store/members/types';
import { AddPeopleProps } from './types';
import './styles.scss';

const AddPeople: React.FC<AddPeopleProps> = ({ setOpenAddPeopleModal }) => {
  const { channelName, members, user } = useSelector((state: AppState) => ({
    channelName: state.currentChannel.name,
    members: state.members,
    user: state.user,
  }));
  const [usernames, setUsernames] = useState<string[]>([]);
  const onSubmit = () => {
    setOpenAddPeopleModal(false);
    // eslint-disable-next-line
    console.log(usernames);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Text className="form__message">
        Select the teammate/s you would like to become member/s of
        <Text tag="span" className="channel-name">
          {channelName}
        </Text>
      </Text>
      <div className="form__inner">
        {members.list
          .filter((m: Member) => m.id !== user.id)
          .map((m: Member) => {
            const active = usernames.includes(m.username);
            return (
              <Button
                key={m.id}
                className={`form__button ${
                  active ? 'form__button--active' : ''
                }`}
                type="button"
                color="transparent"
                title={m.username}
                onClick={() => {
                  const newUsernames = usernames.filter(
                    (n: string) => n !== m.username
                  );

                  if (active) {
                    setUsernames([...newUsernames]);
                  } else {
                    setUsernames([...usernames, m.username]);
                  }
                }}
              >
                {m.username}
                <Icon
                  className="form__icon"
                  type="checkmark"
                  color="white"
                  size="xm"
                />
              </Button>
            );
          })}
      </div>
      <Text className="form__message" tag="span" size="xm">
        To add a teammate who’s not on Stack, you’ll need to
        <Button
          className="form__open-invite-button"
          type="button"
          color="transparent"
        >
          invite them first
        </Button>
      </Text>
      <Button
        className="form__submit-button"
        type="submit"
        disabled={usernames.length < 1}
      >
        Add
      </Button>
    </Form>
  );
};

export default AddPeople;
