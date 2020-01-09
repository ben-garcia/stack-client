import React from 'react';

import { WorkspaceInfoProps } from './types';
import './styles.scss';

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({ user }) => {
  return (
    <div className="workspace-info">
      <section className="workspace-info__inner-left">
        <div className="workspace-name">Testing</div>
        <div className="workspace-username">{user.username}</div>
      </section>
      <section className="workspace-info__inner-right">
        <div className="channel-name">#general</div>
        <div className="channel-info">
          <div className="channel-member-count">members: 0 |</div>
          <div className="channel-description">
            Company-wide announcements and work-based matters
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkspaceInfo;
