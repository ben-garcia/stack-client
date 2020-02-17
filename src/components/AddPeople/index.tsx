import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Form } from 'components';
import { AppState } from 'store';
import { Member } from 'store/members/types';
import { AddPeopleProps } from './types';
import './styles.scss';

const AddPeople: React.FC<AddPeopleProps> = ({ setOpenAddPeopleModal }) => {
  const { members } = useSelector((state: AppState) => ({
    members: state.members,
  }));
  const onSubmit = () => {
    setOpenAddPeopleModal(false);
    // eslint-disable-next-line
    console.log(members);
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="form__textarea">
        {members.list.map((m: Member) => (
          <Button type="button">{m.username}</Button>
        ))}
      </div>
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddPeople;
