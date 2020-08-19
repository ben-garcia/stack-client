import GetCurrentWorkspace from '../actions';

describe('workspace actions', () => {
  const workspace = {
    createdAt: '',
    id: 1,
    name: 'workspace name',
    ownerId: 1,
    updatedAt: '',
  };

  describe('getCurrentTeammate', () => {
    it('should return the correct type and channel', () => {
      const result = GetCurrentWorkspace(workspace);
      const expected = { type: 'GET_CURRENT_WORKSPACE', payload: workspace };
      expect(result).toEqual(expected);
    });
  });
});
