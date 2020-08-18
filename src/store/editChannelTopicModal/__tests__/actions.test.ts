import {
  openEditChannelTopicModal,
  closeEditChannelTopicModal,
} from '../actions';

describe('editChannelDescriptionModal actions', () => {
  describe('openEditChannelDescriptionModal', () => {
    it('should return the correct type', () => {
      const result = openEditChannelTopicModal();
      const expected = { type: 'OPEN_EDIT_CHANNEL_TOPIC_MODAL' };
      expect(result).toEqual(expected);
    });
  });

  describe('closeEditChannelDescriptionModal', () => {
    it('should return the correct type', () => {
      const result = closeEditChannelTopicModal();
      const expected = { type: 'CLOSE_EDIT_CHANNEL_TOPIC_MODAL' };
      expect(result).toEqual(expected);
    });
  });
});
