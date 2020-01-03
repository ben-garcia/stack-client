import React from 'react';

import { WorkspaceInfo } from '../../components';
import './styles.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <section className="dashboard__top-nav">
        <WorkspaceInfo />
      </section>
      <aside className="dashboard__sidebar">
        <section className="sidebar-workspaces">Workspaces</section>
        <section className="sidebar-channels">Channel Nav</section>
      </aside>
      <main className="dashboard__main">Main</main>
    </div>
  );
};

export default Dashboard;
