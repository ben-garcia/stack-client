/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { ChannelList, Scrollbar, TeammatesList, Workspace } from 'components';
import { WorkspaceSidebarProps } from './types';

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
      <Scrollbar color="light" height="92vh">
        <ChannelList />
        <TeammatesList />
      </Scrollbar>
    </div>
  );
};

export default WorkspaceSidebar;
