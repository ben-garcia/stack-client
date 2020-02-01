import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkspaceInfo, WorkspaceList, WorkspaceSidebar } from 'components';
import { AppState } from 'store';
import getCurrentChannelId from 'store/channel/actions';
import { Channel } from 'store/channels/types';
import { requestWorkspaceChannels } from 'store/channels/actions';
import getCurrentMemberId from 'store/member/actions';
import { requestWorkspaceMembers } from 'store/members/actions';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { User } from 'store/user/types';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = ({
  channels,
  currentWorkspaceId,
  currentChannelId,
  getCurrentChannelIdAction,
  getCurrentMemberIdAction,
  getCurrentWorkspaceIdAction,
  requestWorkspaceMembersAction,
  requestUserWorkspacesAction,
  requestWorkspaceChannelsAction,
  user,
  userLoggedInAction,
  workspaces,
}) => {
  const history = useHistory();
  // set up redux store via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
    const memberIdFromLocalStorage = localStorage.getItem('currentMemberId');
    const workspaceIdFromLocalStorage = localStorage.getItem(
      'currentWorkspaceId'
    );
    const channelIdFromLocalStorage = localStorage.getItem('currentChannelId');
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
    // set up current member id on page reload
    if (memberIdFromLocalStorage) {
      getCurrentMemberIdAction(Number(memberIdFromLocalStorage));
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
      // dispatch action to get all current workpace's members
      requestWorkspaceMembersAction();
    }
    // set up channelId on page reload
    if (channelIdFromLocalStorage) {
      const channelId = Number(channelIdFromLocalStorage);
      // dispatch action to update store
      getCurrentChannelIdAction(channelId);
      // ONLY when thte stora has been updated with the current channel is
      // dispatch actoin to get all current channel's messages
    }
  }

  // get the name of the current workspace
  let workspaceName: string | undefined = 'Loading';
  workspaceName = workspaces.list.find(w => w.id === currentWorkspaceId)?.name;

  // get the current channel
  const currentChannel: Channel | undefined = channels.list.find(
    c => c.id === currentChannelId
  );

  return (
    <div className="dashboard">
      <WorkspaceList
        workspaces={workspaces.list}
        className="dashboard__workspaces-list"
      />
      <WorkspaceInfo
        channel={currentChannel}
        workspaceName={workspaceName}
        username={user.username}
        className="dashboard__top-nav"
      />
      <WorkspaceSidebar className="dashboard__sidebar" />
      <main className="dashboard__main">Main</main>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentChannelId: state.currentChannelId,
  currentWorkspaceId: state.currentWorkspaceId,
  channels: state.channels,
  members: state.members,
  user: state.user,
  workspaces: state.workspaces,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLoggedInAction: (user: User) => dispatch(userLoggedIn(user)),
  requestWorkspaceMembersAction: () => dispatch(requestWorkspaceMembers()),
  requestUserWorkspacesAction: () => dispatch(requestUserWorkspaces()),
  requestWorkspaceChannelsAction: () => dispatch(requestWorkspaceChannels()),
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
  getCurrentMemberIdAction: (id: number) => dispatch(getCurrentMemberId(id)),
  getCurrentWorkspaceIdAction: (id: number) =>
    dispatch(getCurrentWorkspaceId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
