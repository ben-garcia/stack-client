import React, { useState } from 'react';

import { Button, Icon, InvitePeopleForm, Modal, Text } from 'components';
import { MessageListProps } from './types';
import './styles.scss';

const MessageList: React.FC<MessageListProps> = ({ className = '' }) => {
  const [invitePeopleFormIsOpen, setInvitePeopleFormIsOpen] = useState<boolean>(
    false
  );
  let classesToAdd: string = 'message-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="message-list__inner">
        <Text tag="span" className="message-list__header" size="sm">
          Direct Message
        </Text>
        <Button
          className="message-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setInvitePeopleFormIsOpen(true)}
          title="Invite People"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
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

export default MessageList;
