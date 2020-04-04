import React from 'react';
import { useSelector } from 'react-redux';

import { Icon, List, Text } from 'components';
import { AppState } from 'store';
import { Message } from 'store/messages';
import { getTime, printFormattedDate } from 'utils';
import './styles.scss';

const MessageList: React.FC = () => {
  const { messages } = useSelector((state: AppState) => ({
    messages: state.messages.list,
  }));

  return (
    <List className="message-list">
      {messages.map((m: Message, i: number) => {
        return (
          <List.Item
            className="message message-list__item"
            hover={false}
            key={m.id}
          >
            {printFormattedDate(messages[i - 1]?.createdAt) !==
            printFormattedDate(messages[i].createdAt) ? (
              <Text size="xm" tag="span" className="message__date-created">
                {printFormattedDate(m.createdAt)}
              </Text>
            ) : null}
            {printFormattedDate(messages[i - 1]?.createdAt) !==
            printFormattedDate(messages[i].createdAt) ? (
              <div className="message__inner">
                <Icon type="user" />
                <div className="message__inner-two">
                  <div>
                    <Text className="message__username" size="sm" tag="span">
                      {m.user.username}
                    </Text>
                    <Text className="message__timestamp" size="xm" tag="span">
                      {getTime(m.createdAt)}
                    </Text>
                  </div>
                  <Text size="sm" tag="span">
                    {m.content}
                  </Text>
                </div>
              </div>
            ) : (
              <Text className="left-margin" size="sm" tag="span">
                {m.content}
              </Text>
            )}
          </List.Item>
        );
      })}
    </List>
  );
};

export default MessageList;
