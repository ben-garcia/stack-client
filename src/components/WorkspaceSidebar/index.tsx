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
import './styles.scss';

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  className = '',
}) => {
  const { channels, currentWorkspace, teammates } = useSelector(
    (state: AppState) => ({
      channels: state.channels,
      currentWorkspace: state.currentWorkspace,
      teammates: state.teammates,
    })
  );
  let classesToAdd: string = 'workspace-sidebar';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      {!channels.isLoading || !teammates.isLoading ? (
        <>
          <Workspace />
          {currentWorkspace.id ? (
            <Scrollbar color="light" containerHeight="92vh">
              <ChannelList />
              <TeammatesList />
            </Scrollbar>
          ) : null}
        </>
      ) : (
        <Placeholder
          className="workspace-left-margin"
          color="light"
          numberOfTags={2}
          type="list"
        />
      )}
    </div>
  );
};

export default WorkspaceSidebar;
