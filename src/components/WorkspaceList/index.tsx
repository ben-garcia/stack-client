import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, List } from 'components';
import { AppState } from 'store';
import { requestWorkspaceTeammates } from 'store/teammates';
import { getCurrentChannel } from 'store/channel';
import { requestWorkspaceChannels } from 'store/channels';
import { getCurrentWorkspaceId } from 'store/workspace';
import { WorkspaceListProps } from './types';
import './styles.scss';

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces,
  className,
}) => {
  const dispatch: Dispatch = useDispatch();
  const { currentWorkspaceId } = useSelector((state: AppState) => ({
    currentWorkspaceId: state.currentWorkspaceId,
  }));
  let classesToAdd: string = 'workspace-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveWorkspaceId = (id: number) => {
    // save current workspace id to be used on page refresh
    localStorage.setItem('currentWorkspaceId', `${id}`);
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
    // dispatch action to change the store
    dispatch(getCurrentWorkspaceId(id));
    // dispatch action to get current workspace channels
    dispatch(requestWorkspaceChannels());
    // dispatch action to get the current workspace teammates
    dispatch(requestWorkspaceTeammates());
  };

  return (
    <aside className={classesToAdd}>
      <List>
        {workspaces.map(w => (
          <List.Item key={w.id} active={w.id === currentWorkspaceId}>
            <Button
              type="button"
              color="transparent"
              onClick={() => saveWorkspaceId(w.id)}
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
