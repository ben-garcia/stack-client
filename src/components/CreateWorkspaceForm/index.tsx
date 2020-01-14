import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, Form } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { CreateWorkspaceFormProps } from './types';

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({
  userId,
}) => {
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [workspaceNameError, setWorkspaceNameError] = useState<string>('');
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState<boolean>(
    true
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (workspaceName.length > 0) {
      setSubmitButtonIsDisabled(false);
      setWorkspaceNameError('');
    } else {
      setSubmitButtonIsDisabled(true);
      setWorkspaceNameError('Name is required');
    }
    setWorkspaceName(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workspaceName.length > 0 && !workspaceNameError) {
      // submit request
      const response = await sendRequest({
        method: 'POST',
        url: '/workspaces',
        data: {
          name: workspaceName,
          owner: userId,
        },
      });

      // eslint-disable-next-line
      console.log(response);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        onChange={handleChange}
        inputId="name"
        type="text"
        label="name"
        value={workspaceName}
        error={workspaceNameError}
      />
      <Button type="submit" disabled={submitButtonIsDisabled}>
        Create
      </Button>
    </Form>
  );
};

const mapStateToProps = (state: AppState) => ({
  userId: state.user.id,
});

export default connect(mapStateToProps)(CreateWorkspaceForm);
