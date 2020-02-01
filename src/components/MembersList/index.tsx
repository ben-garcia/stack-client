import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button, Icon, InvitePeopleForm, Modal, Text } from 'components';
import { AppState } from 'store';
import getCurrentChannelId from 'store/channel/actions';
import getCurrentMemberId from 'store/member/actions';
import { Member } from 'store/members/types';
import { MembersListProps } from './types';
import './styles.scss';

const MembersList: React.FC<MembersListProps> = ({
  currentMemberId,
  className = '',
  members,
  getCurrentChannelIdAction,
  getCurrentMemberIdAction,
}) => {
  const [invitePeopleFormIsOpen, setInvitePeopleFormIsOpen] = useState<boolean>(
    false
  );
  let classesToAdd: string = 'members-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannelId = (id: number) => {
    // save current channel id to be used on page reload
    localStorage.setItem('currentMemberId', `${id}`);
    // dispatch action to change the store
    getCurrentMemberIdAction(id);
    // dispatch action to remove the current channel id
    getCurrentChannelIdAction(0);
  };

  return (
    <section className={classesToAdd}>
      <div className="members-list__inner">
        <Text tag="span" className="members-list__header" size="sm">
          Members
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
        {members.list.map((m: Member) => (
          <li
            key={m.id}
            className={`members-list__item ${
              m.id === currentMemberId ? `members-list__item--active` : ``
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
): Pick<AppState, 'currentMemberId' | 'members'> => ({
  currentMemberId: state.currentMemberId,
  members: state.members,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
  getCurrentMemberIdAction: (id: number) => dispatch(getCurrentMemberId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);
