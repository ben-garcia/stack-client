import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  ChannelDetails,
  ChannelView,
  CreateMessage,
  MessageList,
  Placeholder,
  Scrollbar,
  TeammateView,
  Text,
  WorkspaceInfo,
} from 'components';
import useMediaQuery from 'hooks/useMediaQuery';
import { AppState } from 'store';
import { ViewWrapperProps } from './types';
import './styles.scss';

// FIXME: name is too generic, need a more descriptive name.
const ViewWrapper: FC<ViewWrapperProps> = ({ className = '' }) => {
  const isDesktop = useMediaQuery('(min-width: 998px)');
  const {
    channelDetails,
    currentChannel,
    currentTeammate,
    currentWorkspace,
    directMessages,
    messages,
    workspaces,
  } = useSelector((state: AppState) => ({
    channelDetails: state.channelDetails,
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    currentWorkspace: state.currentWorkspace,
    directMessages: state.directMessages,
    messages: state.messages,
    workspaces: state.workspaces,
  }));

  const classesToAdd = ['main-container', className?.trim()]
    .filter(Boolean)
    .join(' ');

  const hasWorkspace = currentWorkspace.id !== 0;
  const isChannelView =
    hasWorkspace && currentChannel.id !== 0 && currentTeammate.id === 0;
  const isTeammateView =
    hasWorkspace && currentTeammate.id !== 0 && currentChannel.id === 0;
  const hasConversation = isChannelView || isTeammateView;
  // Tracks whether mesasages are being fetched from api.
  const isLoadingConversation =
    (isChannelView && messages.isLoading) ||
    (isTeammateView && directMessages.isLoading);

  // eslint-disable-next-line
  const activeMessageCount = isChannelView
    ? messages.list.length
    : isTeammateView
    ? directMessages.list.length
    : 0;

  return (
    <main className={classesToAdd} id="main-content" tabIndex={-1}>
      <section className="view-wrapper">
        <WorkspaceInfo />

        <Scrollbar
          color="dark"
          containerHeight="84vh"
          scrollbarPositionStartAtBottom
        >
          <div style={{ height: '100%' }}>
            {/* When the user has no workspaces. */}
            {!workspaces.isLoading && workspaces.list.length === 0 && (
              <header className="center-items">
                <h1 className="visually-hidden">Workspace Home</h1>
                <Text tag="p">You don&apos;t have any workspaces yet!</Text>
              </header>
            )}

            {/* When there is no workspace selected. */}
            {!hasWorkspace &&
              (workspaces.isLoading || workspaces.list.length > 0) && (
                <header className="center-items">
                  <h1 className="visually-hidden">Workspace Home</h1>
                  <Text tag="p">Select a workspace to get started.</Text>
                </header>
              )}

            {/* When there is no channel or teammate selected. */}
            {hasWorkspace && !hasConversation && (
              <header className="center-items">
                <h1 className="visually-hidden">Workspace Home</h1>
                <Text tag="p">
                  Select a channel or teammate from the sidebar to start
                  chatting.
                </Text>
              </header>
            )}

            {isChannelView && <ChannelView />}
            {isTeammateView && <TeammateView />}

            {hasConversation && (
              <>
                {isLoadingConversation && activeMessageCount === 0 && (
                  // User feedback to let them know the messages are being fetched.
                  <Placeholder
                    color="dark"
                    numberOfTags={isDesktop ? 4 : 2}
                    type="message"
                  />
                )}
                {activeMessageCount > 0 && <MessageList />}
              </>
            )}
          </div>
        </Scrollbar>

        {hasConversation && (
          <div className="view-wrapper__message">
            <CreateMessage />
          </div>
        )}
      </section>

      {channelDetails.isOpen && (
        <ChannelDetails className="view-wrapper__details" />
      )}
    </main>
  );
};

export default ViewWrapper;
