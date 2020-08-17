import AddPeopleModalReducer from '../reducer';

describe('AddPeopleModalReducer', () => {
  const initialState = false;

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = AddPeopleModalReducer(initialState, action);
    expect(result).toBe(initialState);
  });

  it('return true when action.type === "OPEN_ADD_PEOPLE_MODAL"', () => {
    const action: any = { type: 'OPEN_ADD_PEOPLE_MODAL' };
    const result = AddPeopleModalReducer(initialState, action);
    expect(result).toBe(true);
  });

  it('return false when action.type === "CLOSE_ADD_PEOPLE_MODAL"', () => {
    const action: any = { type: 'CLOSE_ADD_PEOPLE_MODAL' };
    const result = AddPeopleModalReducer(initialState, action);
    expect(result).toBe(false);
  });
});
