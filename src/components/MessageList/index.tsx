import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Icon, List, Text } from 'components';
import { AppState } from 'store';
import { DirectMessage } from 'store/directMessages';
import { Message } from 'store/messages';
import { getTime, printFormattedDate } from 'utils';
import './styles.scss';

const MessageList: React.FC = () => {
  const { directMessages, messages } = useSelector((state: AppState) => ({
    directMessages: state.directMessages.list,
    messages: state.messages.list,
  }));
  const [messagesToRender, setMessagesToRender] = useState<
    DirectMessage[] | Message[]
  >();

  useEffect(() => {
    if (directMessages.length > 0 && messages.length === 0) {
      setMessagesToRender(directMessages);
    }
    if (messages.length > 0 && directMessages.length === 0) {
      setMessagesToRender(messages);
    }
  }, [directMessages, messages]);

  return (
    <List className="message-list">
      {messagesToRender?.map((m: Message | DirectMessage, i: number) => {
        return (
          <List.Item
            className="message message-list__item"
            hover={false}
            key={m.id}
          >
            {printFormattedDate(messagesToRender[i - 1]?.createdAt) !==
            printFormattedDate(messagesToRender[i].createdAt) ? (
              <Text size="xm" tag="span" className="message__date-created">
                {printFormattedDate(m.createdAt)}
              </Text>
            ) : null}
            {printFormattedDate(messagesToRender[i - 1]?.createdAt) !==
            printFormattedDate(messagesToRender[i].createdAt) ? (
              <div className="message__inner">
                <Icon type="user" />
                <div className="message__inner-two">
                  <div>
                    <Text className="message__username" size="sm" tag="span">
                      {m.user?.username}
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
              <div className="message__inner-three">
                <Text className="hover-timestamp" size="xm" tag="span">
                  {getTime(m.createdAt, false)}
                </Text>
                <Text className="left-margin" size="sm" tag="span">
                  {m.content}
                </Text>
              </div>
            )}
          </List.Item>
        );
      })}
    </List>
  );
};

export default MessageList;
