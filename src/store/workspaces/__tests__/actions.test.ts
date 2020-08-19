import {
  addWorkspace,
  receivedUserWorkspaces,
  receivedUserWorkspacesError,
  requestUserWorkspaces,
} from '../actions';

describe('workspaces actions', () => {
  const workspace = {
    createdAt: '',
    id: 1,
    name: 'workspace name',
    ownerId: 1,
    updatedAt: '',
  };

  describe('addWorkspace', () => {
    it('should return the correct type with the workspace', () => {
      const result = addWorkspace(workspace);
      const expected = {
        type: 'ADD_WORKSPACE',
        payload: workspace,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedUserWorkspaces', () => {
    it('should return object with correct type and workspaces', () => {
      const result = receivedUserWorkspaces([workspace, workspace]);
      const expected = {
        type: 'RECEIVED_USER_WORKSPACES',
        payload: [workspace, workspace],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedUserWorkspacesError', () => {
    it('should return object with correct type and error', () => {
      const error = 'this is an error';
      const result = receivedUserWorkspacesError(error);
      const expected = {
        type: 'RECEIVED_USER_WORKSPACES_ERROR',
        payload: error,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('requestWorkspaceChannels', () => {
    it('should return object with correct type', () => {
      const result = requestUserWorkspaces();
      const expected = {
        type: 'REQUEST_USER_WORKSPACES',
      };
      expect(result).toEqual(expected);
    });
  });
});
