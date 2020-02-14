import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Icon, InvitePeopleForm, List, Modal, Text } from 'components';
import { AppState } from 'store';
import { getCurrentChannelId } from 'store/channel/actions';
import getCurrentTeammateId from 'store/teammate/actions';
import { Teammate } from 'store/teammates/types';
import { TeammatesListProps } from './types';
import './styles.scss';

const TeammatesList: React.FC<TeammatesListProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const { currentTeammateId, teammates, user } = useSelector(
    (state: AppState) => ({
      currentTeammateId: state.currentTeammateId,
      teammates: state.teammates,
      user: state.user,
    })
  );
  const [invitePeopleFormIsOpen, setInvitePeopleFormIsOpen] = useState<boolean>(
    false
  );
  let classesToAdd: string = 'teammates-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannelId = (id: number) => {
    // save current teammate id to be used on page reload
    localStorage.setItem('currentTeammateId', `${id}`);
    // dispatch action to change the store
    dispatch(getCurrentTeammateId(id));
    // dispatch action to remove the current channel id
    dispatch(getCurrentChannelId(0));
    // remove current mmeber id from local storage
    localStorage.removeItem('currentChannelId');
  };

  return (
    <section className={classesToAdd}>
      <div className="teammates-list__inner">
        <Text tag="span" className="teammates-list__header" size="sm">
          Teammates
        </Text>
        <Button
          className="teammates-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setInvitePeopleFormIsOpen(true)}
          title="Invite People"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
      <List>
        {teammates.list.map((t: Teammate) => (
          <List.Item key={t.id} active={t.id === currentTeammateId}>
            <Button
              type="button"
              color="transparent"
              onClick={() => saveChannelId(t.id)}
            >
              <Icon
                type="circle"
                size="xm"
                color="white"
                className="teammates-list__icon"
              />
              {t.username}
              {user.id === t.id ? ` (You)` : ''}
            </Button>
          </List.Item>
        ))}
      </List>
      {invitePeopleFormIsOpen && (
        <Modal
          header="Invite People"
          size="sm"
          onClose={() => setInvitePeopleFormIsOpen(false)}
        >
          <InvitePeopleForm
            setInvitePeopleFormIsOpen={setInvitePeopleFormIsOpen}
          />
        </Modal>
      )}
    </section>
  );
};

export default TeammatesList;
