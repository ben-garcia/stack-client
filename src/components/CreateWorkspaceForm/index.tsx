import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form, Icon, Text } from 'components';
import { sendRequest } from 'api';
import { AppState } from 'store';
import { clearChannels } from 'store/channels';
import { clearDirectMessages } from 'store/directMessages';
import { clearMessages } from 'store/messages';
import { clearTeammates } from 'store/teammates';
import { getCurrentWorkspace } from 'store/workspace';
import { addWorkspace } from 'store/workspaces';
import { CreateWorkspaceFormProps } from './types';
import './styles.scss';

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({
  createWorkspaceFormIsOpen,
}) => {
  const dispatch: Dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => ({
    user: state.user,
  }));
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);
  const [workspaceNameError, setWorkspaceNameError] = useState<string>('');
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState<boolean>(
    true
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    setIsSubmitting(true);

    if (workspaceName.length > 0 && !workspaceNameError) {
      try {
        if (
          user.username === 'stackguest' ||
          user.username === 'stacktestuser'
        ) {
          const workspace = {
            id: Math.random(),
            name: workspaceName,
            ownerId: user.id as number,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
          };
          // dispatch to the store
          dispatch(addWorkspace(workspace));
          // close the modal
          createWorkspaceFormIsOpen(false);

          // check whether the newly created workspace should open
          if (openWorkspace) {
            dispatch(getCurrentWorkspace(workspace));
            // remove the list of channels from the previous workspace
            dispatch(clearChannels());
            // remove the list of teammates from the previous workspace
            dispatch(clearTeammates());
            // remove the current messages(if any) from the previous workspace
            dispatch(clearMessages());
            // remove the current direct messages(if any) from the previous workspace
            dispatch(clearDirectMessages());
          }
        } else {
          // submit request
          const {
            data: { workspace },
          } = await sendRequest({
            method: 'POST',
            url: '/workspaces',
            data: {
              name: workspaceName,
              owner: user.id,
            },
          });

          // dispatch action to add it to the store
          dispatch(addWorkspace(workspace));
          // close the modal
          createWorkspaceFormIsOpen(false);

          // check whether the newly created workspace should open
          if (openWorkspace) {
            dispatch(getCurrentWorkspace(workspace));
            // remove the list of channels from the previous workspace
            dispatch(clearChannels());
            // remove the list of teammates from the previous workspace
            dispatch(clearTeammates());
            // remove the current messages(if any) from the previous workspace
            dispatch(clearMessages());
            // remove the current direct messages(if any) from the previous workspace
            dispatch(clearDirectMessages());
          }
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log('CreateWorkspaceForm submit Error: ', { err });
        setIsSubmitting(false);
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
            value={`${openWorkspace}`}
          />
          <Text className="create-workspace__message">
            This option will (if checked) open the newly created workspace upon
            creation. To keep the you current workspace, leave unchecked.
          </Text>
          <Button
            className="create-workspace__submit-button"
            disabled={submitButtonIsDisabled && !isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <Icon color="white" isLoading size="sm" type="spinner" />
            ) : (
              <Text tag="span">Create</Text>
            )}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateWorkspaceForm;
