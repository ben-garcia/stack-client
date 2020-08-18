import DirectMessagesReducer from '../reducer';
import { DirectMessagesState } from '../types';

describe('DirectMessagesReducer', () => {
  const initialState: DirectMessagesState = { isLoading: false, list: [] };
  const directMessage = {
    content: 'content',
    createdAt: '',
    id: 1,
    updatedAt: '',
    user: { color: '', username: 'user644' },
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = DirectMessagesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new directMessage to the list when action.type === "ADD_DIRECT_MESSAGE"', () => {
    const action: any = {
      type: 'ADD_DIRECT_MESSAGE',
      payload: directMessage,
    };
    const expected = {
      ...initialState,
      list: [directMessage],
    };
    const result = DirectMessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return no directMessages when action.type === "CLEAR_DIRECT_MESSAGES"', () => {
    const action: any = {
      type: 'CLEAR_DIRECT_MESSAGES',
    };
    const result = DirectMessagesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return isLoading === true when action.type === "REQUEST_USER_DIRECT_MESSAGES"', () => {
    const action: any = {
      type: 'REQUEST_USER_DIRECT_MESSAGES',
    };
    const expected = {
      ...initialState,
      isLoading: true,
    };
    const result = DirectMessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return isLoading === false when action.type === "RECEIVED_USER_DIRECT_MESSAGES"', () => {
    const action: any = {
      type: 'RECEIVED_USER_DIRECT_MESSAGES',
      payload: [directMessage],
    };
    const expected = {
      ...initialState,
      list: [directMessage],
    };
    const result = DirectMessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return error when action.type === "RECEIVED_USER_DIRECT_MESSAGES_ERROR"', () => {
    const error = 'this error';
    const action: any = {
      type: 'RECEIVED_USER_DIRECT_MESSAGES_ERROR',
      payload: error,
    };
    const expected = {
      ...initialState,
      error,
    };
    const result = DirectMessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
