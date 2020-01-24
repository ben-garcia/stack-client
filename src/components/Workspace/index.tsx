import React, { useState } from 'react';

import { Button, CreateWorkspaceForm, Icon, Modal } from 'components';
import { WorkspaceProps } from './types';
import './styles.scss';

const Workspace: React.FC<WorkspaceProps> = ({
  workspaceName,
  username,
  className = '',
}) => {
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
        <div className="workspace__name">{workspaceName}</div>
        <div className="workspace__username">{username}</div>
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
