import React from 'react';

import { ChannelList, TeammatesList, Workspace } from 'components';
import { WorkspaceSidebarProps } from './types';
import './styles.scss';

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  className = '',
}) => {
  let classesToAdd: string = 'workspace-sidebar';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      <Workspace />
      <ChannelList />
      <TeammatesList />
    </div>
  );
};

export default WorkspaceSidebar;
