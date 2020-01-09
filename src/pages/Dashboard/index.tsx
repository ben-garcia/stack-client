import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { WorkspaceInfo } from 'components';
import { AppState } from 'store';
import userLoggedIn from 'store/user/actions';
import { User } from 'store/user/types';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = ({ user, userLoggedInAction }) => {
  // set up redux via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
    const parsedUser = JSON.parse(userFromLocalStorage!);
    userLoggedInAction(parsedUser);
  }

  return (
    <div className="dashboard">
      <section className="dashboard__top-nav">
        <WorkspaceInfo user={user} />
      </section>
      <aside className="dashboard__sidebar">
        <section className="sidebar-workspaces">Workspaces</section>
        <section className="sidebar-channels">Channel Nav</section>
      </aside>
      <main className="dashboard__main">Main</main>
    </div>
  );
};

const mapStateToProps = (state: AppState): AppState => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLoggedInAction: (user: User) => dispatch(userLoggedIn(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
