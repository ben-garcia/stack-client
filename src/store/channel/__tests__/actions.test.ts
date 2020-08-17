import {
  getCurrentChannel,
  updateChannelTopic,
  updateChannelDescription,
} from '../actions';

describe('channel actions', () => {
  const channel = {
    createdAt: '',
    description: 'description',
    id: 1,
    name: 'name',
    private: false,
    topic: 'topic',
    updatedAt: '',
  };

  describe('getCurrentChannel', () => {
    it('should return the correct type and channel', () => {
      const result = getCurrentChannel(channel);
      const expected = { type: 'GET_CURRENT_CHANNEL', payload: channel };
      expect(result).toEqual(expected);
    });
  });

  describe('updateChannelTopic', () => {
    it('should return the correct type with new topic', () => {
      const newTopic = 'new topic';
      const result = updateChannelTopic(newTopic);
      const expected = { type: 'UPDATE_CHANNEL_TOPIC', payload: newTopic };
      expect(result).toEqual(expected);
    });
  });

  describe('updatedChannelDescription', () => {
    it('should return the correct type with new description', () => {
      const newDescription = 'new description';
      const result = updateChannelDescription(newDescription);
      const expected = {
        type: 'UPDATE_CHANNEL_DESCRIPTION',
        payload: newDescription,
      };
      expect(result).toEqual(expected);
    });
  });
});
