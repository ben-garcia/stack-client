import React from 'react';
import { useSelector } from 'react-redux';

import {
  ChannelDetails,
  ChannelView,
  CreateMessage,
  MessageList,
  Placeholder,
  Scrollbar,
  TeammateView,
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
  } = useSelector((state: AppState) => ({
    channelDetails: state.channelDetails,
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    directMessages: state.directMessages,
    messages: state.messages,
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
            {currentTeammate && currentChannel.id === 0 && <TeammateView />}
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
