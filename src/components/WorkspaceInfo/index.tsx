import React from 'react';

import { Channel, Workspace } from 'components';
import { WorkspaceInfoProps } from './types';
import './styles.scss';

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({ className }) => {
  let classesToAdd: string = 'workspace-info';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      <Workspace className="workspace-info__inner-left" />
      <Channel className="workspace-info__inner-right" />
    </div>
  );
};

export default WorkspaceInfo;
