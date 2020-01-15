import React from 'react';

import { ChannelList, MessageList } from 'components';
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
      <MessageList />
    </div>
  );
};

export default WorkspaceSidebar;
