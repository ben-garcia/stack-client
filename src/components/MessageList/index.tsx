import React from 'react';
import { useSelector } from 'react-redux';

import { List } from 'components';
import { AppState } from 'store';
import { Message } from 'store/messages';
import './styles.scss';

const MessageList: React.FC = () => {
  const { messages } = useSelector((state: AppState) => ({
    messages: state.messages.list,
  }));

  return (
    <List className="message-list">
      {messages.map((m: Message) => (
        <List.Item className="message-list__item" hover={false} key={m.id}>
          {m.content}
        </List.Item>
      ))}
    </List>
  );
};

export default MessageList;
