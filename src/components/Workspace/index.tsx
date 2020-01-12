import React from 'react';

import { WorkspaceProps } from './types';
import './styles.scss';

const Workspace: React.FC<WorkspaceProps> = ({ className }) => {
  let classesToAdd: string = 'workspace';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="workspace__name">Workspace Name</div>
      <div className="workspace__owner">Workspace Owner</div>
    </section>
  );
};

export default Workspace;
