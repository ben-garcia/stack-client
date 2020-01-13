import React from 'react';

import { Button } from 'components';
import { WorkspaceProps } from './types';
import './styles.scss';

const Workspace: React.FC<WorkspaceProps> = ({ className }) => {
  let classesToAdd: string = 'workspace';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="workspace__inner">
        <div className="workspace__name">Workspace Name</div>
        <div className="workspace__owner">Workspace Owner</div>
      </div>
      <Button
        className="workspace__add-button"
        type="button"
        color="transparent"
        iconType="plus"
      />
    </section>
  );
};

export default Workspace;
