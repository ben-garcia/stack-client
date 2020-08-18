import {
  openEditChannelDescriptionModal,
  closeEditChannelDescriptionModal,
} from '../actions';

describe('editChannelDescriptionModal actions', () => {
  describe('openEditChannelDescriptionModal', () => {
    it('should return the correct type', () => {
      const result = openEditChannelDescriptionModal();
      const expected = { type: 'OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL' };
      expect(result).toEqual(expected);
    });
  });

  describe('closeEditChannelDescriptionModal', () => {
    it('should return the correct type', () => {
      const result = closeEditChannelDescriptionModal();
      const expected = { type: 'CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL' };
      expect(result).toEqual(expected);
    });
  });
});
