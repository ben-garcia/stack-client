import TeammatesReducer from '../reducer';
import { TeammatesState } from '../types';

describe('TeammatesReducer', () => {
  const initialState: TeammatesState = { list: [], isLoading: false };
  const teammate = [
    {
      id: 1,
      email: 'user54156@example.com',
      username: 'user54156',
    },
  ];

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = TeammatesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new teammate to the list when action.type === "ADD_TEAMMATE"', () => {
    const action: any = {
      type: 'ADD_TEAMMATE',
      payload: teammate,
    };
    const expected = {
      ...initialState,
      list: [teammate],
    };
    const result = TeammatesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return no teammates when action.type === "CLEAR_TEAMMATES"', () => {
    const action: any = {
      type: 'CLEAR_TEAMMATES',
    };
    const result = TeammatesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return user with active set to true when action.type === "TEAMMATE_CONNECTED"', () => {
    const action: any = {
      type: 'TEAMMATE_CONNECTED',
      payload: teammate[0].username,
    };
    const newState = { ...initialState, list: [...teammate] };
    const result = TeammatesReducer(newState, action);
    const expectedState = {
      list: [{ ...teammate[0], active: true }],
      isLoading: false,
    };
    expect(result).toEqual(expectedState);
  });

  it('return user with active set to false when action.type === "TEAMMATE_DISCONNECTED"', () => {
    const action: any = {
      type: 'TEAMMATE_DISCONNECTED',
      payload: teammate[0].username,
    };
    const newState = {
      ...initialState,
      list: [{ ...teammate[0], active: true }],
    };
    const result = TeammatesReducer(newState as any, action);
    const expectedState = {
      list: [{ ...teammate[0], active: false }],
      isLoading: false,
    };
    expect(result).toEqual(expectedState);
  });

  it('return isLoading === true when action.type === "REQUEST_WORKSPACE_TEAMMATES"', () => {
    const action: any = {
      type: 'REQUEST_WORKSPACE_TEAMMATES',
    };
    const expected = {
      ...initialState,
      isLoading: true,
    };
    const result = TeammatesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return isLoading === false when action.type === "REQUEST_WORKSPACE_TEAMMATES"', () => {
    const action: any = {
      type: 'RECEIVED_WORKSPACE_TEAMMATES',
      payload: [teammate],
    };
    const expected = {
      ...initialState,
      list: [teammate],
    };
    const result = TeammatesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return error when action.type === "REQUEST_WORKSPACE_TEAMMATES_ERROR"', () => {
    const error = 'this error';
    const action: any = {
      type: 'RECEIVED_WORKSPACE_TEAMMATES_ERROR',
      payload: error,
    };
    const expected = {
      ...initialState,
      error,
    };
    const result = TeammatesReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
