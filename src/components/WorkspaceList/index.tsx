import React from 'react';

import { WorkspaceListProps } from './types';
import './styles.scss';

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces,
  className,
}) => {
  let classesToAdd: string = 'workspace-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <ul className="workspace-list__inner">
        {workspaces.map(w => (
          <li key={w.id} className="workspace-list__item" title={w.name}>
            {w.name[0].toUpperCase()}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorkspaceList;
