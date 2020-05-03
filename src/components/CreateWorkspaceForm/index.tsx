import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form, Text } from 'components';
import { sendRequest } from 'api';
import { AppState } from 'store';
import { getCurrentWorkspace } from 'store/workspace';
import { addWorkspace } from 'store/workspaces';
import { CreateWorkspaceFormProps } from './types';
import './styles.scss';

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({
  createWorkspaceFormIsOpen,
}) => {
  const dispatch: Dispatch = useDispatch();
  const { userId } = useSelector((state: AppState) => ({
    userId: state.user.id,
  }));
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);
  const [workspaceNameError, setWorkspaceNameError] = useState<string>('');
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState<boolean>(
    true
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setWorkspaceNameError('Required');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the event referes to the checkbox
    if (e.target.name === 'open') {
      setOpenWorkspace(e.target.checked);
      // no need to continue
      return;
    }
    if (workspaceName.length > 0) {
      setSubmitButtonIsDisabled(false);
      setWorkspaceNameError('');
    } else {
      setSubmitButtonIsDisabled(true);
      setWorkspaceNameError('Required');
    }
    setWorkspaceName(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workspaceName.length > 0 && !workspaceNameError) {
      try {
        // submit request
        const {
          data: { workspace },
        } = await sendRequest({
          method: 'POST',
          url: '/workspaces',
          data: {
            name: workspaceName,
            owner: userId,
          },
        });

        // dispatch action to add it to the store
        dispatch(addWorkspace(workspace));
        // close the modal
        createWorkspaceFormIsOpen(false);

        // check whether the newly created workspace should open
        if (openWorkspace) {
          dispatch(getCurrentWorkspace(workspace));
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log('CreateWorkspaceForm submit Error: ', err);
      }
    }
  };

  return (
    <div className="create-workspace">
      <Text className="create-workspace__sub-header">
        Workspaces are where you set up your team for a particular project. Then
        you can split up the work via channels.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Form.Group flexDirection="column">
          <Form.Input
            onChange={handleChange}
            inputId="name"
            type="text"
            label="Name"
            value={workspaceName}
            error={workspaceNameError}
          />
          <Form.Checkbox
            onBlur={handleBlur}
            onChange={handleChange}
            inputId="open"
            label="Open Workspace"
            value={workspaceName}
          />
          <Text className="create-workspace__message">
            This option will (if checked) open the newly created workspace upon
            creation. To keep the you current workspace, leave unchecked.
          </Text>
          <Button type="submit" disabled={submitButtonIsDisabled}>
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateWorkspaceForm;
