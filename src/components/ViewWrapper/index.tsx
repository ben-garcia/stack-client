import React from 'react';
import { useSelector } from 'react-redux';

import {
  ChannelDetails,
  ChannelView,
  CreateMessage,
  Icon,
  MessageList,
  Placeholder,
  Scrollbar,
  Text,
  WorkspaceInfo,
} from 'components';
import { AppState } from 'store';
import { ViewWrapperProps } from './types';
import './styles.scss';

const ViewWrapper: React.FC<ViewWrapperProps> = ({ className = '' }) => {
  const {
    channelDetails,
    currentChannel,
    currentTeammate,
    directMessages,
    messages,
    user,
  } = useSelector((state: AppState) => ({
    channelDetails: state.channelDetails,
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    directMessages: state.directMessages,
    messages: state.messages,
    user: state.user,
  }));
  let classesToAdd: string = 'main-container';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <main className={classesToAdd}>
      <section className="view-wrapper">
        <WorkspaceInfo />
        <Scrollbar
          color="dark"
          containerHeight="84vh"
          scrollbarPositionStartAtBottom
        >
          <div>
            {currentChannel.id !== 0 && !currentTeammate.id && <ChannelView />}
            {/* NOTE: move to new component */}
            {currentTeammate && currentChannel.id === 0 && (
              <div className="view-wrapper__inner">
                {currentChannel.id || currentTeammate.id ? (
                  <div className="c-teammate">
                    <Icon
                      className="c-teammate__user-icon"
                      type="user"
                      size="lg"
                    />
                    <Text className="c-teammate__username" tag="span">
                      {currentTeammate.username}
                    </Text>
                  </div>
                ) : null}
                <div className="c-teammate__inner channel-view__inner">
                  {user.id === currentTeammate.id && (
                    <Text size="sm">
                      <Text
                        className="c-teammate__message"
                        tag="span"
                        size="sm"
                      >
                        This is your space.
                      </Text>
                      Draft messages, list your to-dos, or keep links and files
                      handy. You can also talk to yourself here, but please bear
                      in mind you’ll have to supply both sides of the
                      conversation.
                    </Text>
                  )}
                  {currentTeammate.id ? (
                    <Text size="sm">
                      This is the very beginning of your direct message history
                      with
                      <Text
                        className="c-teammate__message c-teammate__message--margin-left"
                        tag="span"
                        size="sm"
                      >
                        {currentTeammate.username}
                      </Text>
                    </Text>
                  ) : null}
                </div>
              </div>
            )}
            {(directMessages.list.length > 0 && directMessages.isLoading) ||
            (messages.list.length > 0 && messages.isLoading) ? (
              <Placeholder color="dark" numberOfTags={4} type="message" />
            ) : (
              <MessageList />
            )}
          </div>
        </Scrollbar>
        <div>
          {(currentChannel.id && !currentTeammate.id) ||
          (currentTeammate.id && !currentChannel.id) ? (
            <div className="view-wrapper__message">
              <CreateMessage />
            </div>
          ) : null}
        </div>
      </section>
      {channelDetails.isOpen && (
        <ChannelDetails className="view-wrapper__details" />
      )}
    </main>
  );
};

export default ViewWrapper;
