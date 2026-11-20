import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Icon, Text } from 'components';
import { AppState } from 'store';
import { DirectMessage } from 'store/directMessages';
import { ChannelMessage } from 'store/messages';
import { getTime, printFormattedDate } from 'utils';
import './styles.scss';

type ChatMessage = ChannelMessage | DirectMessage;
type RenderMessage = ChatMessage & {
  user: { color?: string; username: string };
};

const MessageList: React.FC = () => {
  const {
    channelMessages,
    // currentChannel,
    // currentTeammate,
    directMessages,
    user,
    members,
  } = useSelector((state: AppState) => ({
    channelMessages: state.messages.list,
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    directMessages: state.directMessages.list,
    members: state.members.list,
    user: state.user,
    workspaces: state.workspaces.list,
  }));

  // Track the messages, regardless whether they're channel or direct messages.
  const [messagesToRender, setMessagesToRender] = useState<ChatMessage[]>([]);
  // Track what message has focus
  const [focusedIndex, setFocusedIndex] = useState(0);
  // Track the newly appended message, and read out by screen readers.
  const [latestAnnouncement, setLatestAnnouncement] = useState('');
  // Track the references of all rendered messages.
  const messageRefs = useRef<(HTMLElement | null)[]>([]);
  // Track the current length of messages for when a new message is added.
  const currentMessagesLength = useRef(0);
  // Track initialization and the first message ID to reliably detect true channel switches
  const hasInitializedFocus = useRef(false);
  const prevFirstMessageIdRef = useRef<string | number | null>(null);
  // Track the ID of the currently focused message so focus persists even if
  // message tab stop loses focus.
  const focusedMessageIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    let currentMessages: ChatMessage[] = [];

    // Determine the type of message.
    if (directMessages.length > 0 && channelMessages.length === 0) {
      currentMessages = directMessages;
    } else if (channelMessages.length > 0 && directMessages.length === 0) {
      currentMessages = channelMessages;
    }

    // Track the id of the first message, check when user switches channels.
    const currentFirstId = currentMessages[0]?.id ?? null;

    // Detect if the user switched channels, first message id changed.
    if (currentFirstId !== prevFirstMessageIdRef.current) {
      hasInitializedFocus.current = false;
      focusedMessageIdRef.current = null;
      prevFirstMessageIdRef.current = currentFirstId;
    }

    const prevLength = messagesToRender.length;
    setMessagesToRender(currentMessages);

    if (currentMessages.length > 0) {
      if (!hasInitializedFocus.current) {
        // On initial chanel load, focus the latest message
        const lastIndex = currentMessages.length - 1;

        setFocusedIndex(lastIndex);
        focusedMessageIdRef.current = currentMessages[lastIndex].id;
        hasInitializedFocus.current = true;
      } else if (currentMessages.length > prevLength) {
        // New messages arrived in the SAME channel:
        const oldFocusedId = focusedMessageIdRef.current;
        const oldIndex = currentMessages.findIndex(m => m.id === oldFocusedId);
        const wasAtBottom = oldIndex === prevLength - 1;

        if (wasAtBottom || oldIndex === -1) {
          // If they were at the bottom tracking new messages, pin to the new last message
          const newLastIndex = currentMessages.length - 1;
          setFocusedIndex(newLastIndex);
          focusedMessageIdRef.current = currentMessages[newLastIndex].id;
        } else {
          // If user -- using the keyboard -- navigated up to view an older
          // message, preserve the exact focus position!
          setFocusedIndex(oldIndex);
        }
      }
    }

    if (
      currentMessages.length > currentMessagesLength.current &&
      currentMessagesLength.current !== 0
    ) {
      // Add to the live region so that it's announced by screen readers.
      const newestMessage = currentMessages[currentMessages.length - 1];
      if (newestMessage.user.username !== user.username) {
        setLatestAnnouncement(
          `New message from ${newestMessage.user.username} at ${getTime(
            newestMessage.createdAt
          )}: ${newestMessage.content}`
        );
      }
    }

    // Update messages length.
    currentMessagesLength.current = currentMessages.length;
  }, [directMessages, channelMessages, user.username, messagesToRender.length]);

  // Keep track of the length of messages to render. When a new message is appended,
  // updated the message references.
  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, messagesToRender.length);
  }, [messagesToRender]);

  // Safely clamp the focused index so it never goes out of bounds.
  const safeFocusedIndex =
    messagesToRender.length > 0
      ? Math.min(focusedIndex, messagesToRender.length - 1)
      : 0;

  // Implement keyboard navigation.
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Nothing to do when there are no message to render.
    if (messagesToRender.length === 0) return;

    let newIndex = index;

    switch (e.key) {
      case 'ArowRight':
      case 'ArrowUp': {
        e.preventDefault(); // Prevent default scrolling behavior.
        newIndex = index <= 0 ? messagesToRender.length - 1 : index - 1;
        break;
      }
      case 'ArrowLeft':
      case 'ArrowDown': {
        e.preventDefault();
        newIndex = index === messagesToRender.length - 1 ? 0 : index + 1;
        break;
      }
      case 'Home': {
        e.preventDefault();
        newIndex = 0;
        break;
      }
      case 'End': {
        e.preventDefault();
        newIndex = messagesToRender.length - 1;
        break;
      }
      default:
        return;
    }

    setFocusedIndex(newIndex);

    focusedMessageIdRef.current = messagesToRender[newIndex]?.id || null;
    messageRefs.current[newIndex]?.focus();
  };

  // Add color and user to the messages.
  const processedMessages: RenderMessage[] = messagesToRender.map(message => {
    const userColor =
      message.user.color ||
      members.find(m => m.username === message.user.username)?.color;
    return {
      ...message,
      user: { ...message.user, color: userColor },
    } as RenderMessage;
  });

  const groups: {
    formattedDate: string;
    dateTime: string;
    items: { message: RenderMessage; index: number; showUserHeader: boolean }[];
  }[] = [];

  // Group the messages by date.
  processedMessages.forEach((message, index) => {
    const formattedDate = printFormattedDate(message.createdAt);
    let group = groups[groups.length - 1];

    if (!group || group.formattedDate !== formattedDate) {
      group = {
        formattedDate,
        dateTime: message.createdAt.split('T')[0],
        items: [],
      };
      groups.push(group);
    }

    const prevInGroup = group.items[group.items.length - 1]?.message;
    const showUserHeader =
      !prevInGroup || prevInGroup.user.username !== message.user.username;

    group.items.push({ message, index, showUserHeader });
  });

  return groups.length ? (
    <section aria-label="Message history">
      {/* NOTE: 1. WAI-ARIA specifies role="log" for messaging logs. The issue is
                that this overrides arrow keys. This is a problem because I
                have implemented a custom roving tabindex widget that uses
                ArrowDown, ArrowUp, End, Home keys to navigate the message list.
                2. As I understand it, role="log" expects a static document rather
                than an interactive one. Keyboard navigation is breaking because
                screen reader -- orca in this case -- intercepts the array keys
                before React has a change to run the callback function(handleKeyDown).
                3. Adding role="listbox" and role="option"
                signals to screen readers that this is an interactive widget
                and respects the custom keyboard navigation.

                A role="feed" is for scrollable lists of messages where items are
                dynamically appended. The issue is it has spotty support on orca
                running on Wayland. So, role="listbox" is a fallback that
                real-world chat apps use to force keyboard navigation. */}
      <div
        className="list message-list"
        role="listbox"
        aria-label="Channel messages"
        tabIndex={-1}
      >
        {groups.map(group => (
          <div
            key={group.dateTime}
            role="group"
            aria-label={group.formattedDate}
            className="message-group"
          >
            <div className="message-group__header" aria-hidden="true">
              <hr aria-hidden="true" className="horizontal-line" />
              <Text size="xm" tag="span" className="message__date-created">
                <time dateTime={group.dateTime}>{group.formattedDate}</time>
              </Text>
            </div>

            {group.items.map(({ message, index, showUserHeader }) => (
              <div
                key={message.id}
                role="option"
                aria-selected={safeFocusedIndex === index}
                aria-label={`Message from ${message.user.username} at ${getTime(
                  message.createdAt
                )}: ${message.content}`}
                className="message message-list__item message__wrapper"
                onKeyDown={e => handleKeyDown(e, index)}
                ref={el => {
                  messageRefs.current[index] = el;
                }}
                tabIndex={safeFocusedIndex === index ? 0 : -1}
              >
                {showUserHeader ? (
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
                          <time dateTime={message.createdAt}>
                            {getTime(message.createdAt)}
                          </time>
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
                      <time dateTime={message.createdAt}>
                        {getTime(message.createdAt, false)}
                      </time>
                    </Text>

                    <Text
                      tag="p"
                      className="message__content left-margin"
                      size="sm"
                    >
                      {message.content}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {latestAnnouncement}
      </div>
    </section>
  ) : (
    <header className="center-items">
      <h1 className="visually-hidden">Workspace Home</h1>
      <Text tag="p">There are no messages.</Text>
    </header>
  );
};

export default MessageList;
