// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
//
// import { Icon, List, Text } from 'components';
// import { AppState } from 'store';
// import { DirectMessage } from 'store/directMessages';
// import { Message } from 'store/messages';
// import { getTime, printFormattedDate } from 'utils';
// import './styles.scss';
//
// const MessageList: React.FC = () => {
//   const { channelMessages, directMessages, user, members } = useSelector(
//     (state: AppState) => ({
//       channelMessages: state.messages.list,
//       directMessages: state.directMessages.list,
//       members: state.members.list,
//       user: state.user,
//     })
//   );
//   const [messagesToRender, setMessagesToRender] = useState<
//     DirectMessage[] | Message[]
//   >();
//   const announcements = useRef(0);
//
//   useEffect(() => {
//     if (directMessages.length > 0 && channelMessages.length === 0) {
//       setMessagesToRender(directMessages);
//       announcements.current = directMessages.length;
//     }
//     if (channelMessages.length > 0 && directMessages.length === 0) {
//       setMessagesToRender(channelMessages);
//       announcements.current = channelMessages.length;
//     }
//     // when there's no messages
//     if (directMessages.length === 0 && channelMessages.length === 0) {
//       setMessagesToRender([]);
//     }
//   }, [directMessages, channelMessages]);
//
//   const listItems: Message[][] | DirectMessage[][] = [];
//
//   if (messagesToRender && messagesToRender.length) {
//     for (let i = 0; i < messagesToRender.length; i += 1) {
//       const messagesWithSameDates: Message[] | DirectMessage[] = [];
//
//       messagesWithSameDates.push(messagesToRender[i]);
//
//       for (let j = i + 1; j < messagesToRender.length; j += 1) {
//         if (
//           printFormattedDate(messagesToRender[i].createdAt) ===
//           printFormattedDate(messagesToRender[j].createdAt)
//         ) {
//           messagesWithSameDates.push(messagesToRender[j]);
//           // when it reaches the last messagae
//           if (j === messagesToRender.length - 1) {
//             // set i so that it fails the condition and end the outer loop
//             i = messagesToRender.length;
//           }
//         } else {
//           // if the dates don't match, then set i to that position
//           // and end the inner loop
//           i = j - 1;
//           break;
//         }
//       }
//       listItems.push(messagesWithSameDates);
//     }
//   }
//
//   // make sure that message.user has a color property
//   // so that each user icon has a color
//   for (let i = 0; i < listItems.length; i += 1) {
//     for (let j = 0; j < listItems[i].length; j += 1) {
//       // when message.user's color property is undefined
//       if (!listItems[i][j].user.color) {
//         // loop through the members array
//         // which will contain the correct color for that member
//         for (let k = 0; k < members.length; k += 1) {
//           // match the usernames
//           if (members[k].username === listItems[i][j].user.username)
//             listItems[i][j].user.color = members[k].color!;
//         }
//       }
//     }
//   }
//
//   return (
//     <section aria-label="Message history">
//       <List className="message-list" role="log" ariaLabel="Channel messages">
//         {listItems.map((messages: Message[] | DirectMessage[]) => (
//           <List.Item
//             className="message message-list__item"
//             hover={false}
//             key={printFormattedDate(messages[0].createdAt)}
//           >
//             <>
//               <hr aria-hidden="true" className="horizontal-line" />
//               <div className="position-sticky">
//                 <Text size="xm" tag="span" className="message__date-created">
//                   <time dateTime={messages[0].createdAt.split('T')[0]}>
//                     {printFormattedDate(messages[0].createdAt)}
//                   </time>
//                 </Text>
//               </div>
//
//               {messages.map((message: Message | DirectMessage, i: number) => (
//                 <article
//                   aria-label={`${message.user.username}, ${getTime(
//                     message.createdAt
//                   )}`}
//                   className="message__wrapper"
//                   key={message.id}
//                 >
//                   {printFormattedDate(messages[i - 1]?.createdAt) !==
//                     printFormattedDate(messages[i].createdAt) ||
//                   (printFormattedDate(messages[i - 1]?.createdAt) ===
//                     printFormattedDate(messages[i].createdAt) &&
//                     messages[i - 1]?.user?.username !==
//                       messages[i].user?.username) ? (
//                     <div className="message__inner">
//                       <Icon
//                         className="user-icon"
//                         type="user"
//                         color={
//                           user.username === message.user?.username
//                             ? 'purple'
//                             : (message.user.color as any)
//                         }
//                       />
//
//                       <div className="message__inner-two">
//                         <div>
//                           <Text
//                             className="message__username"
//                             size="sm"
//                             tag="span"
//                           >
//                             {message.user?.username}
//                           </Text>
//
//                           <Text
//                             className="message__timestamp"
//                             size="xm"
//                             tag="span"
//                           >
//                             <time dateTime={message.createdAt.split('T')[0]}>
//                               {getTime(message.createdAt)}
//                             </time>
//                           </Text>
//                         </div>
//
//                         <Text className="message__content" size="sm" tag="span">
//                           {message.content}
//                         </Text>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="message__inner-three">
//                       <Text className="hover-timestamp" size="xm" tag="span">
//                         <time dateTime={message.createdAt}>
//                           {getTime(message.createdAt, false)}
//                         </time>
//                       </Text>
//
//                       <Text
//                         tag="p"
//                         className="message__content left-margin"
//                         size="sm"
//                       >
//                         {message.content}
//                       </Text>
//                     </div>
//                   )}
//                 </article>
//               ))}
//             </>
//           </List.Item>
//         ))}
//       </List>
//     </section>
//   );
// };
//
// export default MessageList;

import React, { useEffect, useRef, useState } from 'react';
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

  // State to hold the text string announced to screen readers via aria-live
  const [latestAnnouncement, setLatestAnnouncement] = useState('');

  // Track previous length using your existing announcements ref
  const announcements = useRef(0);

  useEffect(() => {
    let currentMessages: DirectMessage[] | Message[] = [];

    if (directMessages.length > 0 && channelMessages.length === 0) {
      currentMessages = directMessages;
      setMessagesToRender(directMessages);
    } else if (channelMessages.length > 0 && directMessages.length === 0) {
      currentMessages = channelMessages;
      setMessagesToRender(channelMessages);
    } else {
      setMessagesToRender([]);
    }

    // Check if a new message has been appended since the last render
    if (
      currentMessages.length > announcements.current &&
      announcements.current !== 0
    ) {
      const newestMessage = currentMessages[currentMessages.length - 1];

      // Ignore your own message.
      if (newestMessage.user.username !== user.username) {
        setLatestAnnouncement(
          `New message from ${newestMessage.user.username} at ${getTime(
            newestMessage.createdAt
          )}: ${newestMessage.content}`
        );
      }
    }

    // Update reference to the latest length
    announcements.current = currentMessages.length;
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
          if (j === messagesToRender.length - 1) {
            i = messagesToRender.length;
          }
        } else {
          i = j - 1;
          break;
        }
      }
      listItems.push(messagesWithSameDates);
    }
  }

  // Make sure that message.user has a color property
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
    <section aria-label="Message history">
      <List className="message-list" ariaLabel="Channel messages">
        {listItems.map((messages: Message[] | DirectMessage[]) => (
          <List.Item
            className="message message-list__item"
            hover={false}
            key={printFormattedDate(messages[0].createdAt)}
          >
            <>
              <hr aria-hidden="true" className="horizontal-line" />
              <div className="position-sticky">
                <Text size="xm" tag="span" className="message__date-created">
                  <time dateTime={messages[0].createdAt.split('T')[0]}>
                    {printFormattedDate(messages[0].createdAt)}
                  </time>
                </Text>
              </div>

              {messages.map((message: Message | DirectMessage, i: number) => (
                <article
                  aria-label={`${message.user.username}, ${getTime(
                    message.createdAt
                  )}`}
                  className="message__wrapper"
                  key={message.id}
                >
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
                            <time dateTime={message.createdAt.split('T')[0]}>
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
                </article>
              ))}
            </>
          </List.Item>
        ))}
      </List>

      <div aria-live="polite" aria-atomic="true" className="visibly-hidden">
        {latestAnnouncement}
      </div>
    </section>
  );
};

export default MessageList;
