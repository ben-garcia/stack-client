import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button } from 'components';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import { requestWorkspaceChannels } from 'store/channels';
import { clearDirectMessages } from 'store/directMessages';
import { clearMessages } from 'store/messages';
import { getCurrentTeammate } from 'store/teammate';
import { requestWorkspaceTeammates } from 'store/teammates';
import { getCurrentWorkspace } from 'store/workspace';
import { Workspace } from 'store/workspaces';
import useRovingTabIndex from 'hooks/useRovingTabIndex';
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
  const { buttonRefs, focusedIndex, handleKeyDown } = useRovingTabIndex(
    workspaces,
    currentWorkspace
  );
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
    // Remove the current channel from the store
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
    // Change the store
    dispatch(getCurrentWorkspace(workspace));
    // Get current workspace channels
    dispatch(requestWorkspaceChannels());
    // Get the current workspace teammates
    dispatch(requestWorkspaceTeammates());
    // Clear all messages
    dispatch(clearDirectMessages());
    dispatch(clearMessages());
  };

  return (
    <nav className={classesToAdd}>
      <div
        aria-label="Workspaces"
        className="workspace-list__list"
        /* NOTE: Using custom element because it needs to be interactive.
         *        Using <ul> and <li> would cause the focus to escape the
         *        workspace list. The issue was, the list(ul,li) element
         *        create a static document structure rather an an interactive
         *        on neccessary for a screen reader. */
        role="listbox"
      >
        {workspaces.map((w, i) => (
          <Button
            ariaLabel={`Workspace ${w.name}${
              w.id === currentWorkspace.id ? ', Active' : ''
            }`}
            ariaSelected={w.id === currentWorkspace.id}
            className="workspace-list__button"
            color="transparent"
            key={w.id}
            // NOTE: React uses event delegation under the hood, so no need to
            // worry about performance.
            onClick={() => saveWorkspace(w)}
            onKeyDown={e => handleKeyDown(e, i)}
            ref={(el: HTMLButtonElement | null) => {
              buttonRefs.current[i] = el;
            }}
            role="option"
            tabIndex={focusedIndex === i ? 0 : -1}
            title={w.name}
          >
            {w.name[0].toUpperCase()}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default WorkspaceList;
