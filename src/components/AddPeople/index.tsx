import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Icon, Text } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { openInvitePeopleModal } from 'store/invitePeopleModal/actions';
import { Teammate } from 'store/teammates/types';
import { AddPeopleProps } from './types';
import './styles.scss';

const AddPeople: React.FC<AddPeopleProps> = ({ setOpenAddPeopleModal }) => {
  const dispatch = useDispatch();
  const { currentChannelId, channelName, teammates, user } = useSelector(
    (state: AppState) => ({
      currentChannelId: state.currentChannel.id,
      channelName: state.currentChannel.name,
      teammates: state.teammates,
      user: state.user,
    })
  );
  const [usernames, setUsernames] = useState<string[]>([]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // send request to the server
    await sendRequest({
      method: 'PUT',
      url: `/channels/${currentChannelId}`,
      data: { members: usernames },
    });

    // update the members list

    // close the modal
    setOpenAddPeopleModal(false);
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
        {teammates.list
          .filter((t: Teammate) => t.id !== user.id)
          .map((t: Teammate) => {
            const active = usernames.includes(t.username);
            return (
              <Button
                key={t.id}
                className={`form__button ${
                  active ? 'form__button--active' : ''
                }`}
                type="button"
                color="transparent"
                title={t.username}
                onClick={() => {
                  const newUsernames = usernames.filter(
                    (n: string) => n !== t.username
                  );

                  if (active) {
                    setUsernames([...newUsernames]);
                  } else {
                    setUsernames([...usernames, t.username]);
                  }
                }}
              >
                {t.username}
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
          onClick={() => {
            setOpenAddPeopleModal(false);
            dispatch(openInvitePeopleModal());
          }}
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
