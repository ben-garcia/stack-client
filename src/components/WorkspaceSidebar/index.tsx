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
  const classesToAdd = ['workspace-sidebar', className.trim()]
    .filter(Boolean)
    .join(' ');

  return (
    <nav aria-label="Workspace Navigation" className={classesToAdd}>
      {channels.isLoading || teammates.isLoading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            height: '100%',
          }}
        >
          <Placeholder
            height="40px"
            color="light"
            numberOfTags={1}
            type="info"
          />
          <Placeholder color="light" numberOfTags={2} type="list" />
        </div>
      ) : (
        <>
          <Workspace />

          {currentWorkspace.id ? (
            <Scrollbar color="light" containerHeight="92vh">
              <ChannelList />
              <TeammatesList />
            </Scrollbar>
          ) : null}
        </>
      )}
    </nav>
  );
};

export default WorkspaceSidebar;
