import React from 'react';

import { Channel, Workspace } from 'components';
import { WorkspaceInfoProps } from './types';
import './styles.scss';

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = () => {
  return (
    <div className="workspace-info">
      <Workspace className="workspace-info__inner-left" />
      <Channel className="workspace-info__inner-right" />
    </div>
  );
};

export default WorkspaceInfo;
