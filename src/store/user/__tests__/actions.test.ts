import { UserLoggedIn, UserLoggedOut } from '../actions';

describe('teammate actions', () => {
  describe('UserLoggedIn', () => {
    it('should return the correct type and channel', () => {
      const user = {
        createdAt: '',
        email: '2525@email.com',
        id: 1,
        updatedAt: '',
        username: 'user1656',
      };
      const result = UserLoggedIn(user);
      const expected = { type: 'USER_LOGGED_IN', payload: user };
      expect(result).toEqual(expected);
    });
  });

  describe('UserLoggedOut', () => {
    it('should return the correct type and channel', () => {
      const result = UserLoggedOut();
      const expected = { type: 'USER_LOGGED_OUT' };
      expect(result).toEqual(expected);
    });
  });
});
