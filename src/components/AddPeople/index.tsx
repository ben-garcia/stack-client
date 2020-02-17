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
  const [ids, setIds] = useState<number[]>([]);
  const onSubmit = () => {
    setOpenAddPeopleModal(false);
    // eslint-disable-next-line
    console.log(ids);
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
            const active = ids.includes(m.id);

            return (
              <Button
                key={m.id}
                className={`form__button ${
                  active ? 'form__button--active' : ''
                }`}
                type="button"
                color="transparent"
                onClick={() => {
                  const newIds = ids.filter((n: number) => n !== m.id);

                  if (active) {
                    setIds([...newIds]);
                  } else {
                    setIds([...ids, m.id]);
                  }
                }}
              >
                {m.username}
                {active && (
                  <Icon
                    className="form__icon"
                    type="checkmark"
                    color="white"
                    size="xm"
                  />
                )}
              </Button>
            );
          })}
      </div>
      <Button className="form__button" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default AddPeople;
