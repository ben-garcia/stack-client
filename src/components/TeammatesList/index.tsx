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
import { getCurrentTeammate } from 'store/teammate';
import { Teammate } from 'store/teammates/types';
import { TeammatesListProps } from './types';
import './styles.scss';

const TeammatesList: React.FC<TeammatesListProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const {
    currentTeammate,
    invitePeopleModalIsOpen,
    teammates,
    user,
  } = useSelector((state: AppState) => ({
    currentTeammate: state.currentTeammate,
    invitePeopleModalIsOpen: state.invitePeopleModalIsOpen,
    teammates: state.teammates,
    user: state.user,
  }));
  let classesToAdd: string = 'teammates-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveTeammate = (teammate: Teammate) => {
    // if the user clicked on the current teammate
    // then nothing needs to be done
    if (currentTeammate.id === teammate.id) return;
    // dispatch action to change the store
    dispatch(getCurrentTeammate(teammate));
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
    // save current teammate to be used on page reload
    localStorage.setItem('currentTeammate', JSON.stringify(teammate));
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
          <List.Item key={t.id} active={t.id === currentTeammate.id}>
            <Button
              type="button"
              color="transparent"
              className="teammates-list__button"
              onClick={() => saveTeammate({ id: t.id, username: t.username })}
              title={t.active || t.id === user.id ? 'Active' : 'Away'}
            >
              <Icon
                type="circle"
                size="xm"
                color={t.active || user.id === t.id ? 'green' : 'white'}
                className={
                  t.active || user.id === t.id
                    ? 'teammates-list__icon teammates-list__icon--active'
                    : 'teammates-list__icon'
                }
              />
              <Text className="teammates-list__username" size="sm" tag="span">
                {t.username}
                {user.id === t.id ? ` (You)` : ''}
              </Text>
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
