import React from 'react';

import { Button, Icon } from 'components';
import { MessageListProps } from './types';
import './styles.scss';

const MessageList: React.FC<MessageListProps> = ({ className = '' }) => {
  let classesToAdd: string = 'message-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="message-list__inner">
        <span className="message-list__header">Direct Message</span>
        <Button
          className="message-list__add-button"
          type="button"
          color="transparent"
        >
          <Icon type="plus" color="white" />
        </Button>
      </div>
    </section>
  );
};

export default MessageList;
