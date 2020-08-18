import MembersReducer from '../reducer';
import { MembersState } from '../types';

describe('MembersReducer', () => {
  const initialState: MembersState = { list: [] };
  const member = {
    createdAt: '',
    email: 'user135@emai.com',
    id: 1,
    username: 'user135',
    updatedAt: '',
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = MembersReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new member to the list when action.type === "ADD_MEMBER"', () => {
    const action: any = {
      type: 'ADD_MEMBERS',
      payload: member,
    };
    const expected = {
      list: [member],
    };
    const result = MembersReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return no members when action.type === "CLEAR_CHANNEL_MEMBERS"', () => {
    const action: any = {
      type: 'CLEAR_CHANNEL_MEMBERS',
    };
    const result = MembersReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return list of members when action.type === "RECEIVED_CHANNEL_MEMBERS"', () => {
    const action: any = {
      type: 'RECEIVED_CHANNEL_MEMBERS',
      payload: [member, member],
    };
    const expected = {
      list: [member, member],
    };
    const result = MembersReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return error when action.type === "RECEIVED_CHANNEL_MEMBERS_ERROR"', () => {
    const error = 'this error';
    const action: any = {
      type: 'RECEIVED_CHANNEL_MEMBERS_ERROR',
      payload: error,
    };
    const expected = {
      ...initialState,
      error,
    };
    const result = MembersReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
