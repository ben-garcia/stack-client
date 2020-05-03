import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Icon, Text } from 'components';
import { sendRequest } from 'api';
import { AppState } from 'store';
import { closeAddPeopleModal } from 'store/addPeopleModal';
import { openInvitePeopleModal } from 'store/invitePeopleModal';
import { addMember, Member } from 'store/members';
import { Teammate } from 'store/teammates/types';
import { AddPeopleProps } from './types';
import './styles.scss';

const AddPeople: React.FC<AddPeopleProps> = () => {
  const dispatch = useDispatch();
  const { currentChannelId, channelName, members, teammates } = useSelector(
    (state: AppState) => ({
      currentChannelId: state.currentChannel.id,
      channelName: state.currentChannel.name,
      members: state.members.list,
      teammates: state.teammates.list,
    })
  );
  // usernames that the user has selected
  // to be added to the channel member's list
  const [usernames, setUsernames] = useState<string[]>([]);
  // list of the possible teammates that can be added to the channel
  // starts by being the same as teammates
  const [membersToAdd, setMembersToAdd] = useState<Teammate[]>(teammates);

  // determine the teammates that are available to add as members
  // that is, teammates that aren't already members of the channel
  useEffect(() => {
    // loop through both the members and teammates arrays
    // to determine the users that are common in both
    for (let i = 0; i < teammates.length; i += 1) {
      for (let j = 0; j < members.length; j += 1) {
        if (teammates[i]?.username === members[j]?.username) {
          setMembersToAdd(state => {
            return state.filter(t => t.username !== membersToAdd[i]?.username);
          });
        }
      }
    }
    // Disable the warning in the dev tools
    // eslint-disable-next-line
  }, [members, teammates]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // send request to the server
    await sendRequest({
      method: 'PUT',
      url: `/channels/${currentChannelId}`,
      data: { members: usernames },
    });

    // loop through the usernames and members to add
    usernames.forEach((s: string) => {
      membersToAdd.forEach((m: Member) => {
        if (s === m.username) {
          // dispatch action to add new member
          dispatch(addMember({ id: m.id, username: s }));
        }
      });
    });

    // close the modal
    dispatch(closeAddPeopleModal());
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
        {membersToAdd.map((t: Teammate) => {
          const active = usernames.includes(t.username);
          return (
            <Button
              key={t.id}
              className={`form__button ${active ? 'form__button--active' : ''}`}
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
            dispatch(closeAddPeopleModal());
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
