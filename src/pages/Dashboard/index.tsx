import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkspaceInfo, WorkspaceList, WorkspaceSidebar } from 'components';
import { AppState } from 'store';
import userLoggedIn from 'store/user/actions';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { User } from 'store/user/types';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = ({
  user,
  workspaces,
  userLoggedInAction,
  requestUserWorkspacesAction,
}) => {
  // set up redux store via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
    // if a user is stored in localStorage
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage!);
      // dispatch action to updated user in the store
      userLoggedInAction(parsedUser);
      // dispatch action to get all user's workspaces
      requestUserWorkspacesAction();
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

const mapStateToProps = (state: AppState): AppState => ({
  user: state.user,
  workspaces: state.workspaces,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLoggedInAction: (user: User) => dispatch(userLoggedIn(user)),
  requestUserWorkspacesAction: () => dispatch(requestUserWorkspaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
