import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, List } from 'components';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import { requestWorkspaceChannels } from 'store/channels';
import { clearDirectMessages } from 'store/directMessages';
import { clearMessages } from 'store/messages';
import { getCurrentTeammate } from 'store/teammate';
import { requestWorkspaceTeammates } from 'store/teammates';
import { getCurrentWorkspace } from 'store/workspace';
import { Workspace } from 'store/workspaces';
import { WorkspaceListProps } from './types';
import './styles.scss';

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces,
  className,
}) => {
  const dispatch: Dispatch = useDispatch();
  const { currentWorkspace } = useSelector((state: AppState) => ({
    currentWorkspace: state.currentWorkspace,
  }));
  let classesToAdd: string = 'workspace-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveWorkspace = (workspace: Workspace) => {
    // make sure the user hasn't clicked on the current workspace
    if (currentWorkspace.id === workspace.id) return;
    // save current workspace id to be used on page refresh
    localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
    // remove current channel from local storage
    localStorage.removeItem('currentChannel');
    // dispatch action to remove the current channel from the store
    dispatch(
      getCurrentChannel({
        id: 0,
        description: '',
        name: '',
        topic: '',
        private: false,
        createdAt: '',
        updatedAt: '',
      })
    );
    // remove current teammate from local storage
    localStorage.removeItem('currentTeammate');
    // dispatch action to clear the current teammate
    dispatch(
      getCurrentTeammate({
        id: 0,
        username: '',
      })
    );
    // dispatch action to change the store
    dispatch(getCurrentWorkspace(workspace));
    // dispatch action to get current workspace channels
    dispatch(requestWorkspaceChannels());
    // dispatch action to get the current workspace teammates
    dispatch(requestWorkspaceTeammates());
    // dispatch action to clear all messages
    dispatch(clearDirectMessages());
    dispatch(clearMessages());
  };

  return (
    <aside className={classesToAdd}>
      <List className="workspace-list__list">
        {workspaces.map(w => (
          <List.Item
            className="workspace-list__item"
            key={w.id}
            active={w.id === currentWorkspace.id}
          >
            <Button
              type="button"
              color="transparent"
              className="workspace-list__button"
              onClick={() => saveWorkspace(w)}
              title={w.name}
            >
              {w.name[0].toUpperCase()}
            </Button>
          </List.Item>
        ))}
      </List>
    </aside>
  );
};

export default WorkspaceList;
