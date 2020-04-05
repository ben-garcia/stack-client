import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Icon, InvitePeopleForm, List, Modal, Text } from 'components';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import {
  openInvitePeopleModal,
  closeInvitePeopleModal,
} from 'store/invitePeopleModal';
import { requestUserDirectMessages } from 'store/directMessages';
import { clearMessages } from 'store/messages';
import { getCurrentTeammateId } from 'store/teammate';
import { Teammate } from 'store/teammates/types';
import { TeammatesListProps } from './types';
import './styles.scss';

const TeammatesList: React.FC<TeammatesListProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const {
    currentTeammateId,
    invitePeopleModalIsOpen,
    teammates,
    user,
  } = useSelector((state: AppState) => ({
    currentTeammateId: state.currentTeammateId,
    invitePeopleModalIsOpen: state.invitePeopleModalIsOpen,
    teammates: state.teammates,
    user: state.user,
  }));
  let classesToAdd: string = 'teammates-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveTeammateId = (id: number) => {
    // save current teammate id to be used on page reload
    localStorage.setItem('currentTeammateId', `${id}`);
    // dispatch action to change the store
    dispatch(getCurrentTeammateId(id));
    // dispatch action to remove the current channel id
    dispatch(
      getCurrentChannel({
        id: 0,
        name: '',
        topic: '',
        description: '',
        private: false,
        createdAt: '',
        updatedAt: '',
      })
    );
    // dispatch action to clear all channel messages
    dispatch(clearMessages());
    // dispatch action to get the direct messages the
    // user has with a particular teammate
    dispatch(requestUserDirectMessages());
    // remove current channel from local storage
    localStorage.removeItem('currentChannel');
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
          onClick={() => dispatch(openInvitePeopleModal())}
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
              className="teammates-list__button"
              onClick={() => saveTeammateId(t.id)}
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
      {invitePeopleModalIsOpen && (
        <Modal
          header="Invite People"
          size="sm"
          onClose={() => dispatch(closeInvitePeopleModal())}
        >
          <InvitePeopleForm />
        </Modal>
      )}
    </section>
  );
};

export default TeammatesList;
