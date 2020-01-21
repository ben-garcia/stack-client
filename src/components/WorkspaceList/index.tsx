import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Button } from 'components';
import getCurrentWorkspaceId from 'store/workspace/actions';
import { WorkspaceListProps } from './types';
import './styles.scss';

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces,
  className,
  getCurrentWorkspaceIdAction,
}) => {
  let classesToAdd: string = 'workspace-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveId = (id: number) => {
    // save current workspace id to be used on page refresh
    localStorage.setItem('currentWorkspaceId', `${id}`);
    // dispatch action to change the store
    getCurrentWorkspaceIdAction(id);
  };

  return (
    <section className={classesToAdd}>
      <ul className="workspace-list__inner">
        {workspaces.map(w => (
          <li key={w.id} className="workspace-list__item" title={w.name}>
            <Button
              type="button"
              color="transparent"
              onClick={() => saveId(w.id)}
            >
              {w.name[0].toUpperCase()}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCurrentWorkspaceIdAction: (id: number) =>
    dispatch(getCurrentWorkspaceId(id)),
});

export default connect(null, mapDispatchToProps)(WorkspaceList);
