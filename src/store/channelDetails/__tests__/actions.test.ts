import {
  openChannelDetails,
  openChannelDetailsWithMembers,
  closeChannelDetails,
} from '../actions';

describe('channel actions', () => {
  describe('openChannelDetails', () => {
    it('should return the correct type', () => {
      const result = openChannelDetails();
      const expected = { type: 'OPEN_CHANNEL_DETAILS' };
      expect(result).toEqual(expected);
    });
  });

  describe('openChannelDetailsWihMembers', () => {
    it('should return the correct type', () => {
      const result = openChannelDetailsWithMembers();
      const expected = { type: 'OPEN_CHANNEL_DETAILS_WITH_MEMBERS' };
      expect(result).toEqual(expected);
    });
  });

  describe('closeChannelDetails', () => {
    it('should return the correct type', () => {
      const result = closeChannelDetails();
      const expected = {
        type: 'CLOSE_CHANNEL_DETAILS',
      };
      expect(result).toEqual(expected);
    });
  });
});
