import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, CreateWorkspaceForm, Icon, Modal, Text } from 'components';
import { AppState } from 'store';
import { WorkspaceProps } from './types';
import './styles.scss';

const Workspace: React.FC<WorkspaceProps> = ({ className = '' }) => {
  const { username, workspaceName } = useSelector((state: AppState) => ({
    username: state.user.username,
    workspaceName: state.currentWorkspace.name,
  }));
  const [createWorkspaceFormIsOpen, setCreateWorkspaceFormIsOpen] = useState<
    boolean
  >(false);
  let classesToAdd: string = 'workspace';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div>
        <div className="workspace__inner">
          <Text tag="span" size="md" className="workspace__name">
            {workspaceName}
          </Text>
          <Icon
            type="chevron-down"
            size="xm"
            color="white"
            className="workspace__chevron-icon"
          />
        </div>
        <div className="workspace__inner-two">
          <Icon
            type="circle"
            size="xm"
            color="green"
            className="workspace__circle-icon"
          />
          <Text tag="span" className="workspace__username">
            {username}
          </Text>
        </div>
      </div>
      <Button
        className="workspace__add-button"
        type="button"
        color="transparent"
        onClick={() => setCreateWorkspaceFormIsOpen(true)}
        title="Create a new Workspace"
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
