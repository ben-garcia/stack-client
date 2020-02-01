import React from 'react';

import { ChannelList, MembersList } from 'components';
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
      <ChannelList />
      <MembersList />
    </div>
  );
};

export default WorkspaceSidebar;
