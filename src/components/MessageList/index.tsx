import React from 'react';
import { useSelector } from 'react-redux';

import { List } from 'components';
import { AppState } from 'store';
import { Message } from 'store/messages';

const MessageList: React.FC = () => {
  const { messages } = useSelector((state: AppState) => ({
    messages: state.messages.list,
  }));

  return (
    <section>
      <List>
        {messages.map((m: Message) => (
          <List.Item key={m.id}>{m.content}</List.Item>
        ))}
      </List>
    </section>
  );
};

export default MessageList;
