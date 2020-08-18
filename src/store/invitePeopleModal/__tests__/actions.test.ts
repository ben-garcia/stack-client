import { openInvitePeopleModal, closeInvitePeopleModal } from '../actions';

describe('invitePeopleModal actions', () => {
  describe('openInvitePeopleModal', () => {
    it('should return the correct type', () => {
      const result = openInvitePeopleModal();
      const expected = { type: 'OPEN_INVITE_PEOPLE_MODAL' };
      expect(result).toEqual(expected);
    });
  });

  describe('closeEditChannelDescriptionModal', () => {
    it('should return the correct type', () => {
      const result = closeInvitePeopleModal();
      const expected = { type: 'CLOSE_INVITE_PEOPLE_MODAL' };
      expect(result).toEqual(expected);
    });
  });
});
