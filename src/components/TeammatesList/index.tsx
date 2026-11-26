import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Icon, InvitePeopleForm, Modal, Text } from 'components';
import useRovingTabIndex from 'hooks/useRovingTabIndex';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import {
  openInvitePeopleModal,
  closeInvitePeopleModal,
} from 'store/invitePeopleModal';
import { requestUserDirectMessages } from 'store/directMessages';
import { clearChannelMessages } from 'store/channelMessages';
import { closeMobileSidebar } from 'store/mobileSidebar';
import { getCurrentTeammate } from 'store/teammate';
import { Teammate } from 'store/teammates/types';
import { TeammatesListProps } from './types';
import './styles.scss';

const TeammatesList: React.FC<TeammatesListProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const {
    currentTeammate,
    invitePeopleModalIsOpen,
    mobileSidebarIsOpen,
    teammates,
    user,
  } = useSelector((state: AppState) => ({
    currentTeammate: state.currentTeammate,
    invitePeopleModalIsOpen: state.invitePeopleModalIsOpen,
    mobileSidebarIsOpen: state.mobileSidebarIsOpen,
    teammates: state.teammates.list,
    user: state.user,
  }));
  const { buttonRefs, focusedIndex, handleKeyDown } = useRovingTabIndex(
    teammates,
    currentTeammate
  );
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
    dispatch(clearChannelMessages());
    // dispatch action to get the direct messages the
    // user has with a particular teammate
    dispatch(requestUserDirectMessages());
    // remove current channel from local storage
    localStorage.removeItem('currentChannel');
    // save current teammate to be used on page reload
    localStorage.setItem('currentTeammate', JSON.stringify(teammate));
  };

  return (
    <section aria-labelledby="teammates-heading" className={classesToAdd}>
      <div className="teammates-list__inner">
        <h2 id="teammates-heading" className="teammates-list__header">
          Teammates
        </h2>

        <Button
          ariaLabel="Invite People"
          className="teammates-list__add-button"
          color="transparent"
          onClick={() => dispatch(openInvitePeopleModal())}
          title="Invite People"
          type="button"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>

      <div
        aria-labelledby="teammates-heading"
        aria-orientation="vertical"
        role="listbox"
        style={{ padding: '0.3rem' }}
      >
        {teammates.map((t, i) => (
          <Button
            ariaLabel={`${t.username} is ${
              t.active || t.id === user.id ? 'Active' : 'Away'
            }`}
            ariaSelected={t.id === currentTeammate.id}
            className="teammates-list__button"
            color="transparent"
            key={t.id}
            onClick={() => {
              if (mobileSidebarIsOpen) dispatch(closeMobileSidebar());
              saveTeammate({ id: t.id, username: t.username });
            }}
            onKeyDown={e => handleKeyDown(e, i)}
            ref={(el: HTMLButtonElement | null) => {
              buttonRefs.current[i] = el;
            }}
            role="option"
            tabIndex={focusedIndex === i ? 0 : -1}
            title={t.active || t.id === user.id ? 'Active' : 'Away'}
            type="button"
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
        ))}
      </div>

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
