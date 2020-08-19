import {
  addTeammate,
  clearTeammates,
  teammateConnected,
  teammateDisconnected,
  receivedWorkspaceTeammates,
  receivedWorkspaceTeammatesError,
  requestWorkspaceTeammates,
} from '../actions';

describe('teammates actions', () => {
  const teammate = {
    createdAt: '',
    email: 'email@example.com',
    id: 1,
    updatedAt: '',
    username: 'user26777',
  };

  describe('addTeammate', () => {
    it('should return the correct type with the teammate', () => {
      const result = addTeammate(teammate);
      const expected = {
        type: 'ADD_TEAMMATE',
        payload: teammate,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('clearTeammates', () => {
    it('should return object with correct type', () => {
      const result = clearTeammates();
      const expected = {
        type: 'CLEAR_TEAMMATES',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('teammateConnected', () => {
    it('should return object with correct type and username', () => {
      const result = teammateConnected(teammate.username);
      const expected = {
        type: 'TEAMMATE_CONNECTED',
        payload: teammate.username,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('teammateDisconnected', () => {
    it('should return object with correct type and username', () => {
      const result = teammateDisconnected(teammate.username);
      const expected = {
        type: 'TEAMMATE_DISCONNECTED',
        payload: teammate.username,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedWorkspaceTeammates', () => {
    it('should return object with correct type and teammates', () => {
      const result = receivedWorkspaceTeammates([teammate, teammate]);
      const expected = {
        type: 'RECEIVED_WORKSPACE_TEAMMATES',
        payload: [teammate, teammate],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedWorkspaceChannelsError', () => {
    it('should return object with correct type and error', () => {
      const error = 'this is an error';
      const result = receivedWorkspaceTeammatesError(error);
      const expected = {
        type: 'RECEIVED_WORKSPACE_TEAMMATES_ERROR',
        payload: error,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('requestWorkspaceChannels', () => {
    it('should return object with correct type', () => {
      const result = requestWorkspaceTeammates();
      const expected = {
        type: 'REQUEST_WORKSPACE_TEAMMATES',
      };
      expect(result).toEqual(expected);
    });
  });
});
