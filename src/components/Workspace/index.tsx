import React, { useState } from 'react';

import { Button, CreateWorkspaceForm, Icon, Modal } from 'components';
import { WorkspaceProps } from './types';
import './styles.scss';

const Workspace: React.FC<WorkspaceProps> = ({ className }) => {
  const [createWorkspaceFormIsOpen, setCreateWorkspaceFormIsOpen] = useState<
    boolean
  >(false);
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
        onClick={() => setCreateWorkspaceFormIsOpen(true)}
      >
        <Icon color="white" type="plus" size="sm" />
      </Button>
      {createWorkspaceFormIsOpen && (
        <Modal
          header="Create a Workspace"
          onClose={() => setCreateWorkspaceFormIsOpen(false)}
          size="sm"
        >
          <CreateWorkspaceForm
            createWorkspaceFormIsOpen={setCreateWorkspaceFormIsOpen}
          />
        </Modal>
      )}
    </section>
  );
};

export default Workspace;
