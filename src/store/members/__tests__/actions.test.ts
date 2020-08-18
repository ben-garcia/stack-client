import {
  addMember,
  clearMembers,
  receivedChannelMembers,
  receivedChannelMembersError,
  requestChannelMembers,
} from '../actions';

describe('members actions', () => {
  const member = {
    createdAt: '',
    email: 'user135@emai.com',
    id: 1,
    username: 'user135',
    updatedAt: '',
  };

  describe('addMember', () => {
    it('should return the correct type with the member', () => {
      const result = addMember(member);
      const expected = {
        type: 'ADD_MEMBERS',
        payload: member,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('clearMembers', () => {
    it('should return object with correct type', () => {
      const result = clearMembers();
      const expected = {
        type: 'CLEAR_CHANNEL_MEMBERS',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('requestChannelMembers', () => {
    it('should return object with correct type', () => {
      const result = requestChannelMembers();
      const expected = {
        type: 'REQUEST_CHANNEL_MEMBERS',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedChannelMembers', () => {
    it('should return object with correct type and chanenls', () => {
      const result = receivedChannelMembers([member, member]);
      const expected = {
        type: 'RECEIVED_CHANNEL_MEMBERS',
        payload: [member, member],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedChannelMembersError', () => {
    it('should return object with correct type and error', () => {
      const error = 'this is an error';
      const result = receivedChannelMembersError(error);
      const expected = {
        type: 'RECEIVED_CHANNEL_MEMBERS_ERROR',
        payload: error,
      };
      expect(result).toEqual(expected);
    });
  });
});
