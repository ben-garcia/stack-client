import React from 'react';

import { Button, Icon, Text } from 'components';
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
        <Text tag="span" className="message-list__header" size="sm">
          Direct Message
        </Text>
        <Button
          className="message-list__add-button"
          type="button"
          color="transparent"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
    </section>
  );
};

export default MessageList;
