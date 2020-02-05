import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button, Icon, InvitePeopleForm, Modal, Text } from 'components';
import { AppState } from 'store';
import getCurrentChannelId from 'store/channel/actions';
import getCurrentTeammateId from 'store/teammate/actions';
import { Teammate } from 'store/teammates/types';
import { MembersListProps } from './types';
import './styles.scss';

const MembersList: React.FC<MembersListProps> = ({
  currentTeammateId,
  className = '',
  getCurrentChannelIdAction,
  getCurrentTeammateIdAction,
  teammates,
  user,
}) => {
  const [invitePeopleFormIsOpen, setInvitePeopleFormIsOpen] = useState<boolean>(
    false
  );
  let classesToAdd: string = 'members-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannelId = (id: number) => {
    // save current teammate id to be used on page reload
    localStorage.setItem('currentTeammateId', `${id}`);
    // dispatch action to change the store
    getCurrentTeammateIdAction(id);
    // dispatch action to remove the current channel id
    getCurrentChannelIdAction(0);
    // remove current mmeber id from local storage
    localStorage.removeItem('currentChannelId');
  };

  return (
    <section className={classesToAdd}>
      <div className="members-list__inner">
        <Text tag="span" className="members-list__header" size="sm">
          Teammates
        </Text>
        <Button
          className="members-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setInvitePeopleFormIsOpen(true)}
          title="Invite People"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
      <ul className="members-list__list">
        {teammates.list.map((m: Teammate) => (
          <li
            key={m.id}
            className={`members-list__item ${
              m.id === currentTeammateId ? `members-list__item--active` : ``
            }`}
          >
            <Button
              type="button"
              color="transparent"
              onClick={() => saveChannelId(m.id)}
            >
              <Icon
                type="circle"
                size="xm"
                color="white"
                className="members-list__icon"
              />
              {m.username}
              {user.id === m.id ? ` (You)` : ''}
            </Button>
          </li>
        ))}
      </ul>
      {invitePeopleFormIsOpen && (
        <Modal
          header="Invite People"
          size="sm"
          onClose={() => setInvitePeopleFormIsOpen(false)}
        >
          <InvitePeopleForm />
        </Modal>
      )}
    </section>
  );
};

const mapStateToProps = (
  state: AppState
): Pick<AppState, 'currentTeammateId' | 'teammates' | 'user'> => ({
  currentTeammateId: state.currentTeammateId,
  teammates: state.teammates,
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
  getCurrentTeammateIdAction: (id: number) =>
    dispatch(getCurrentTeammateId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);
