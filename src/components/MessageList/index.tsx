import React from 'react';
import { useSelector } from 'react-redux';

import { Icon, List, Text } from 'components';
import { AppState } from 'store';
import { Message } from 'store/messages';
import printFormatedDate from 'utils';
import './styles.scss';

const MessageList: React.FC = () => {
  const { messages } = useSelector((state: AppState) => ({
    messages: state.messages.list,
  }));

  return (
    <List className="message-list">
      {messages.map((m: Message) => (
        <List.Item
          className="message message-list__item"
          hover={false}
          key={m.id}
        >
          <Text size="xm" tag="span" className="message__date-created">
            {printFormatedDate(m.createdAt)}
          </Text>
          <div className="message__inner">
            <Icon type="user" />
            <div className="message__inner-two">
              <Text className="message__username" size="sm" tag="span">
                {m.user.username}
              </Text>
              <Text size="sm" tag="span">
                {m.content}
              </Text>
            </div>
          </div>
        </List.Item>
      ))}
    </List>
  );
};

export default MessageList;
