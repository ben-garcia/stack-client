import React from 'react';

import './styles.scss';

const WorkspaceInfo: React.FC = () => {
  return (
    <div className="workspace-info">
      <section className="workspace-info__inner-left">
        <div className="workspace-name">Testing</div>
        <div className="workspace-username">Ben Garcia</div>
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
