import GetCurrentTeammate from '../actions';

describe('teammate actions', () => {
  const teammate = {
    createdAt: '',
    email: '2525@email.com',
    id: 1,
    updatedAt: '',
    username: 'user1656',
  };

  describe('getCurrentTeammate', () => {
    it('should return the correct type and channel', () => {
      const result = GetCurrentTeammate(teammate);
      const expected = { type: 'GET_CURRENT_TEAMMATE', payload: teammate };
      expect(result).toEqual(expected);
    });
  });
});
