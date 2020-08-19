import TeammateReducer from '../reducer';

describe('TeammateReducer', () => {
  const initialState = {
    id: 0,
    username: '',
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = TeammateReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new channel when action.type === "GET_CURRENT_TEAMMATE"', () => {
    const payload = {
      id: 1,
      username: 'user52525',
    };
    const action: any = { type: 'GET_CURRENT_TEAMMATE', payload };
    const result = TeammateReducer(initialState, action);
    expect(result).toEqual(payload);
    expect(result).not.toEqual(initialState);
  });
});
