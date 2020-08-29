import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Button,
  CreateWorkspaceForm,
  Icon,
  Modal,
  MenuDrawer,
  Text,
} from 'components';
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
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState<boolean>(false);
  let classesToAdd: string = 'workspace';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <Button
        className="workspace__inner"
        color="transparent"
        onClick={() => setLogoutModalIsOpen(!logoutModalIsOpen)}
        type="button"
      >
        <div className="workspace__inner-two">
          <Text tag="span" size="md" className="workspace__name">
            {workspaceName || 'No workspace yet'}
          </Text>
          <Icon
            className="workspace__chevron-down-icon"
            color="white"
            size="xm"
            type="chevron-down"
          />
        </div>
        <div className="workspace__container">
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
      </Button>
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
      {logoutModalIsOpen && (
        <Modal
          background={false}
          className="workspace__drawer"
          onClose={() => setLogoutModalIsOpen(false)}
        >
          <MenuDrawer />
        </Modal>
      )}
    </section>
  );
};

export default Workspace;
