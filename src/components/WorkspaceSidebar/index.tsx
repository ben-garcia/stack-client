/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useSelector } from 'react-redux';

import {
  ChannelList,
  Placeholder,
  Scrollbar,
  TeammatesList,
  Workspace,
} from 'components';
import { AppState } from 'store';
import { WorkspaceSidebarProps } from './types';

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  className = '',
}) => {
  const { channels, teammates } = useSelector((state: AppState) => ({
    channels: state.channels,
    currentWorkspace: state.currentWorkspace,
    teammates: state.teammates,
  }));
  let classesToAdd: string = 'workspace-sidebar';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      {(channels.list.length > 0 && !channels.isLoading) ||
      (teammates.list.length > 0 && !teammates.isLoading) ? (
        <>
          <Workspace />
          <Scrollbar color="light" containerHeight="92vh">
            <ChannelList />
            <TeammatesList />
          </Scrollbar>
        </>
      ) : (
        <Placeholder numberOfTags={2} type="list" />
      )}
    </div>
  );
};

export default WorkspaceSidebar;
