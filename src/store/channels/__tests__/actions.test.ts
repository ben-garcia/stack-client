import {
  addChannel,
  clearChannels,
  requestWorkspaceChannels,
  receivedWorkspaceChannels,
  receivedWorkspaceChannelsError,
} from '../actions';

describe('channels actions', () => {
  const channel = {
    createdAt: '',
    description: 'description',
    id: 1,
    name: 'name',
    private: false,
    topic: 'topic',
    updatedAt: '',
  };

  describe('addChannel', () => {
    it('should return the correct type with the channel', () => {
      const result = addChannel(channel);
      const expected = {
        type: 'ADD_CHANNEL',
        payload: channel,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('clearChannels', () => {
    it('should return object with correct type', () => {
      const result = clearChannels();
      const expected = {
        type: 'CLEAR_CHANNELS',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('requestWorkspaceChannels', () => {
    it('should return object with correct type', () => {
      const result = requestWorkspaceChannels();
      const expected = {
        type: 'REQUEST_WORKSPACE_CHANNELS',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedWorkspaeChannels', () => {
    it('should return object with correct type and chanenls', () => {
      const result = receivedWorkspaceChannels([channel, channel]);
      const expected = {
        type: 'RECEIVED_WORKSPACE_CHANNELS',
        payload: [channel, channel],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedWorkspaceChannelsError', () => {
    it('should return object with correct type and error', () => {
      const error = 'this is an error';
      const result = receivedWorkspaceChannelsError(error);
      const expected = {
        type: 'RECEIVED_WORKSPACE_CHANNELS_ERROR',
        payload: error,
      };
      expect(result).toEqual(expected);
    });
  });
});
