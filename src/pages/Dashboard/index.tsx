import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkspaceInfo, WorkspaceList, WorkspaceSidebar } from 'components';
import { AppState } from 'store';
import { getCurrentChannelId, updateChannelTopic } from 'store/channel/actions';
import { Channel } from 'store/channels/types';
import { requestWorkspaceChannels } from 'store/channels/actions';
import getCurrentTeammateId from 'store/teammate/actions';
import { requestWorkspaceTeammates } from 'store/teammates/actions';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { User } from 'store/user/types';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = ({
  channels,
  currentChannel,
  currentTeammateId,
  currentWorkspaceId,
  getCurrentChannelIdAction,
  getCurrentTeammateIdAction,
  getCurrentWorkspaceIdAction,
  requestWorkspaceTeammatesAction,
  requestUserWorkspacesAction,
  requestWorkspaceChannelsAction,
  teammates,
  updateChannelTopicAction,
  user,
  userLoggedInAction,
  workspaces,
}) => {
  const history = useHistory();
  // set up redux store via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
    const teammateIdFromLocalStorage = localStorage.getItem(
      'currentTeammateId'
    );
    const workspaceIdFromLocalStorage = localStorage.getItem(
      'currentWorkspaceId'
    );
    const channelIdFromLocalStorage = localStorage.getItem('currentChannelId');
    // get current channel topic from local storage
    const currentChannelTopic = localStorage.getItem('currentChannelTopic');
    // if a user is stored in localStorage
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage!);
      // dispatch action to updated user in the store
      userLoggedInAction(parsedUser);
      // dispatch action to get all user's workspaces
      requestUserWorkspacesAction();
    } else {
      // if there is no user item in local storage then
      // it means the user isn't logged in so
      // redirect to the landing page
      history.replace('/');
    }
    // set up current teammate id on page reload
    if (teammateIdFromLocalStorage) {
      getCurrentTeammateIdAction(Number(teammateIdFromLocalStorage));
    }
    // set up workspaceId on page reload
    if (workspaceIdFromLocalStorage) {
      const workspaceId = Number(workspaceIdFromLocalStorage);
      // dispatch action to update store
      getCurrentWorkspaceIdAction(workspaceId);
      // ONLY when the store has been updated with the current workspace id
      // dispatch action to get all current workspace's channels
      requestWorkspaceChannelsAction();
      // ONLY when the store has been pudated with the curent workspace id
      // dispatch action to get all current workpace's teammates
      requestWorkspaceTeammatesAction();
    }
    // set up channelId on page reload
    if (channelIdFromLocalStorage) {
      const channelId = Number(channelIdFromLocalStorage);
      // dispatch action to update store
      getCurrentChannelIdAction(channelId);
      if (currentChannelTopic) {
        // dispatch action to update the current channel's topic
        updateChannelTopicAction(currentChannelTopic);
      }
    }
  }

  // get the name of the current workspace
  let workspaceName: string | undefined = 'Loading';
  workspaceName = workspaces.list.find(w => w.id === currentWorkspaceId)?.name;

  // get the current channel
  const channel: Channel | undefined = channels.list.find(
    c => c.id === currentChannel.id
  );

  // get the current teammate
  const currentTeammate = teammates.list.find(m => m.id === currentTeammateId);

  return (
    <div className="dashboard">
      <WorkspaceList
        workspaces={workspaces.list}
        className="dashboard__workspaces-list"
      />
      <WorkspaceInfo
        channel={channel}
        className="dashboard__top-nav"
        teammate={currentTeammate}
        username={user.username}
        workspaceName={workspaceName}
      />
      <WorkspaceSidebar className="dashboard__sidebar" />
      <main className="dashboard__main">Main</main>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentChannel: state.currentChannel,
  currentTeammateId: state.currentTeammateId,
  currentWorkspaceId: state.currentWorkspaceId,
  channels: state.channels,
  teammates: state.teammates,
  user: state.user,
  workspaces: state.workspaces,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLoggedInAction: (user: User) => dispatch(userLoggedIn(user)),
  requestWorkspaceTeammatesAction: () => dispatch(requestWorkspaceTeammates()),
  requestUserWorkspacesAction: () => dispatch(requestUserWorkspaces()),
  requestWorkspaceChannelsAction: () => dispatch(requestWorkspaceChannels()),
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
  getCurrentTeammateIdAction: (id: number) =>
    dispatch(getCurrentTeammateId(id)),
  getCurrentWorkspaceIdAction: (id: number) =>
    dispatch(getCurrentWorkspaceId(id)),
  updateChannelTopicAction: (topic: string) =>
    dispatch(updateChannelTopic(topic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
