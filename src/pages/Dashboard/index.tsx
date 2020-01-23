import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkspaceInfo, WorkspaceList, WorkspaceSidebar } from 'components';
import { AppState } from 'store';
import getCurrentChannelId from 'store/channel/actions';
import { requestWorkspaceChannels } from 'store/channels/actions';
import userLoggedIn from 'store/user/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { User } from 'store/user/types';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = ({
  getCurrentChannelIdAction,
  getCurrentWorkspaceIdAction,
  requestUserWorkspacesAction,
  requestWorkspaceChannelsAction,
  user,
  userLoggedInAction,
  workspaces,
}) => {
  // set up redux store via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
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
    }
    // set up workspaceId on page reload
    if (workspaceIdFromLocalStorage) {
      const currentWorkspaceId = Number(workspaceIdFromLocalStorage);
      // dispatch action to update store
      getCurrentWorkspaceIdAction(currentWorkspaceId);
      // ONLY when the store has been updated with the current workspace id
      // dispatch action to get all current workspace's channels
      requestWorkspaceChannelsAction();
    }
    // set up channelId on page reload
    if (channelIdFromLocalStorage) {
      const currentChannelId = Number(channelIdFromLocalStorage);
      // dispatch action to update store
      getCurrentChannelIdAction(currentChannelId);
      // ONLY when thte stora has been updated with the current channel is
      // dispatch actoin to get all current channel's messages
    }
  }

  return (
    <div className="dashboard">
      <WorkspaceInfo className="dashboard__top-nav" />
      <aside className="dashboard__sidebar">
        <WorkspaceList
          workspaces={workspaces.list}
          className="sidebar-workspaces"
        />
        <WorkspaceSidebar className="sidebar-channels" />
      </aside>
      <main className="dashboard__main">Main</main>
    </div>
  );
};

const mapStateToProps = (
  state: AppState
): Pick<AppState, 'user' | 'workspaces'> => ({
  user: state.user,
  workspaces: state.workspaces,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLoggedInAction: (user: User) => dispatch(userLoggedIn(user)),
  requestUserWorkspacesAction: () => dispatch(requestUserWorkspaces()),
  requestWorkspaceChannelsAction: () => dispatch(requestWorkspaceChannels()),
  getCurrentWorkspaceIdAction: (id: number) =>
    dispatch(getCurrentWorkspaceId(id)),
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
