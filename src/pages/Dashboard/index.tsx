import React from 'react';
import { connect } from 'react-redux';

import { WorkspaceInfo } from 'components';
import { AppState } from 'store';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
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

export default connect(mapStateToProps)(Dashboard);
