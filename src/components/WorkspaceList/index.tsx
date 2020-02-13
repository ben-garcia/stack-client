import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, List } from 'components';
import { AppState } from 'store';
import { requestWorkspaceTeammates } from 'store/teammates/actions';
import { requestWorkspaceChannels } from 'store/channels/actions';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { WorkspaceListProps } from './types';
import './styles.scss';

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  currentWorkspaceId,
  workspaces,
  className,
  getCurrentWorkspaceIdAction,
  requestWorkspaceChannelsAction,
  requestWorkspaceTeammatesAction,
}) => {
  let classesToAdd: string = 'workspace-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveWorkspaceId = (id: number) => {
    // save current workspace id to be used on page refresh
    localStorage.setItem('currentWorkspaceId', `${id}`);
    // dispatch action to change the store
    getCurrentWorkspaceIdAction(id);
    // dispatch action to get current workspace channels
    requestWorkspaceChannelsAction();
    // dispatch action to get the current workspace teammates
    requestWorkspaceTeammatesAction();
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

const mapStateToProps = (
  state: AppState
): Pick<AppState, 'currentWorkspaceId'> => ({
  currentWorkspaceId: state.currentWorkspaceId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCurrentWorkspaceIdAction: (id: number) =>
    dispatch(getCurrentWorkspaceId(id)),
  requestWorkspaceChannelsAction: () => dispatch(requestWorkspaceChannels()),
  requestWorkspaceTeammatesAction: () => dispatch(requestWorkspaceTeammates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList);
