import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Icon, List, Text } from 'components';
import { AppState } from 'store';
import { DirectMessage } from 'store/directMessages';
import { Message } from 'store/messages';
import { getTime, printFormattedDate } from 'utils';
import './styles.scss';

const MessageList: React.FC = () => {
  const { channelMessages, directMessages, user, members } = useSelector(
    (state: AppState) => ({
      channelMessages: state.messages.list,
      directMessages: state.directMessages.list,
      members: state.members.list,
      user: state.user,
    })
  );
  const [messagesToRender, setMessagesToRender] = useState<
    DirectMessage[] | Message[]
  >();

  useEffect(() => {
    if (directMessages.length > 0 && channelMessages.length === 0) {
      setMessagesToRender(directMessages);
    }
    if (channelMessages.length > 0 && directMessages.length === 0) {
      setMessagesToRender(channelMessages);
    }
    // when there's no messages
    if (directMessages.length === 0 && channelMessages.length === 0) {
      setMessagesToRender([]);
    }
  }, [directMessages, channelMessages]);

  const listItems: Message[][] | DirectMessage[][] = [];

  if (messagesToRender && messagesToRender.length) {
    for (let i = 0; i < messagesToRender.length; i += 1) {
      const messagesWithSameDates: Message[] | DirectMessage[] = [];

      messagesWithSameDates.push(messagesToRender[i]);

      for (let j = i + 1; j < messagesToRender.length; j += 1) {
        if (
          printFormattedDate(messagesToRender[i].createdAt) ===
          printFormattedDate(messagesToRender[j].createdAt)
        ) {
          messagesWithSameDates.push(messagesToRender[j]);
          // when it reaches the last messagae
          if (j === messagesToRender.length - 1) {
            // set i so that it fails the condition and end the outer loop
            i = messagesToRender.length;
          }
        } else {
          // if the dates don't match, then set i to that position
          // and end the inner loop
          i = j - 1;
          break;
        }
      }
      listItems.push(messagesWithSameDates);
    }
  }

  // make sure that message.user has a color property
  // so that each user icon has a color
  for (let i = 0; i < listItems.length; i += 1) {
    for (let j = 0; j < listItems[i].length; j += 1) {
      // when message.user's color property is undefined
      if (!listItems[i][j].user.color) {
        // loop through the members array
        // which will contain the correct color for that member
        for (let k = 0; k < members.length; k += 1) {
          // match the usernames
          if (members[k].username === listItems[i][j].user.username)
            listItems[i][j].user.color = members[k].color!;
        }
      }
    }
  }

  return (
    <List className="message-list">
      {listItems.map((messages: Message[] | DirectMessage[]) => (
        <List.Item
          className="message message-list__item"
          hover={false}
          key={`${Math.random()}:${messages[0].id}`}
        >
          <>
            <hr className="horizontal-line" />
            <div className="position-sticky">
              <Text size="xm" tag="span" className="message__date-created">
                {printFormattedDate(messages[0].createdAt)}
              </Text>
            </div>
            {messages.map((message: Message | DirectMessage, i: number) => (
              <div className="message__wrapper" key={message.id}>
                {printFormattedDate(messages[i - 1]?.createdAt) !==
                  printFormattedDate(messages[i].createdAt) ||
                (printFormattedDate(messages[i - 1]?.createdAt) ===
                  printFormattedDate(messages[i].createdAt) &&
                  messages[i - 1]?.user?.username !==
                    messages[i].user?.username) ? (
                  <div className="message__inner">
                    <Icon
                      className="user-icon"
                      type="user"
                      color={
                        user.username === message.user?.username
                          ? 'purple'
                          : (message.user.color as any)
                      }
                    />
                    <div className="message__inner-two">
                      <div>
                        <Text
                          className="message__username"
                          size="sm"
                          tag="span"
                        >
                          {message.user?.username}
                        </Text>
                        <Text
                          className="message__timestamp"
                          size="xm"
                          tag="span"
                        >
                          {getTime(message.createdAt)}
                        </Text>
                      </div>
                      <Text className="message__content" size="sm" tag="span">
                        {message.content}
                      </Text>
                    </div>
                  </div>
                ) : (
                  <div className="message__inner-three">
                    <Text className="hover-timestamp" size="xm" tag="span">
                      {getTime(message.createdAt, false)}
                    </Text>
                    <Text
                      className="message__content left-margin"
                      size="sm"
                      tag="span"
                    >
                      {message.content}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </>
        </List.Item>
      ))}
    </List>
  );
};

export default MessageList;
