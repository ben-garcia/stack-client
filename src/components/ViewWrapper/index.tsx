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
  let classesToAdd: string = 'main-container';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

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
            {workspaces.list.length === 0 && workspaces.isLoading ? (
              <header className="center-items">
                <h1 className="visually-hidden">Workspace Home</h1>
                <Text tag="p">{`You don't have any workspaces yet!`}</Text>
              </header>
            ) : null}

            {/* When there is no workspace selected. */}
            {currentWorkspace.id === 0 ? (
              <header className="center-items">
                <h1 className="visually-hidden">Workspace Home</h1>
                <Text tag="p">Select a workspace to get started.</Text>
              </header>
            ) : null}

            {/* When there is no channel or teammate selected. */}
            {(messages.list.length === 0 || directMessages.list.length === 0) &&
            currentWorkspace.id !== 0 &&
            currentTeammate.id === 0 &&
            currentChannel.id === 0 ? (
              <header className="center-items">
                <h1 className="visually-hidden">Workspace Home</h1>
                <Text tag="p">
                  Select a channel or teammate from the sidebar to start
                  chatting.
                </Text>
              </header>
            ) : null}

            {currentChannel.id !== 0 && currentTeammate.id === 0 ? (
              <ChannelView />
            ) : null}

            {currentTeammate.id !== 0 && currentChannel.id === 0 ? (
              <TeammateView />
            ) : null}

            {(directMessages.list.length > 0 && directMessages.isLoading) ||
            (messages.list.length > 0 && messages.isLoading) ? (
              <Placeholder color="dark" numberOfTags={4} type="message" />
            ) : (
              (currentChannel.id !== 0 ||
                (currentTeammate.id !== 0 && currentWorkspace.id !== 0)) && (
                <MessageList />
              )
            )}
          </div>
        </Scrollbar>

        {(currentChannel.id && !currentTeammate.id) ||
        (currentTeammate.id && !currentChannel.id) ? (
          <div className="view-wrapper__message">
            <CreateMessage />
          </div>
        ) : null}
      </section>

      {channelDetails.isOpen && (
        <ChannelDetails className="view-wrapper__details" />
      )}
    </main>
  );
};

export default ViewWrapper;
