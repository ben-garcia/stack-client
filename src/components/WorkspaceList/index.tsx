import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Button } from 'components';
import { AppState } from 'store';
import { requestWorkspaceMembers } from 'store/members/actions';
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
  requestWorkspaceMembersAction,
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
    // dispatch action to get the current workspace members
    requestWorkspaceMembersAction();
  };

  return (
    <aside className={classesToAdd}>
      <ul className="workspace-list__inner">
        {workspaces.map(w => (
          <li
            key={w.id}
            className={`workspace-list__item ${
              w.id === currentWorkspaceId ? `workspace-list__item--active` : ``
            }`}
            title={w.name}
          >
            <Button
              type="button"
              color="transparent"
              onClick={() => saveWorkspaceId(w.id)}
            >
              {w.name[0].toUpperCase()}
            </Button>
          </li>
        ))}
      </ul>
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
  requestWorkspaceMembersAction: () => dispatch(requestWorkspaceMembers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList);
