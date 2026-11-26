import MessagesReducer from '../reducer';
import { MessagesState } from '../types';

describe('MessagesReducer', () => {
  const initialState: MessagesState = { isLoading: false, list: [] };
  const message = {
    content: 'content',
    createdAt: '',
    id: 1,
    updatedAt: '',
    user: { color: '', username: 'user644' },
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = MessagesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new message to the list when action.type === "ADD_MESSAGE"', () => {
    const action: any = {
      type: 'ADD_MESSAGE',
      payload: message,
    };
    const expected = {
      ...initialState,
      list: [message],
    };
    const result = MessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return no message when action.type === "CLEAR_MESSAGES"', () => {
    const action: any = {
      type: 'CLEAR_MESSAGES',
    };
    const result = MessagesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return isLoading === true when action.type === "REQUEST_CHANNEL_MESSAGES"', () => {
    const action: any = {
      type: 'REQUEST_CHANNEL_MESSAGES',
    };
    const expected = {
      ...initialState,
      isLoading: true,
    };
    const result = MessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return isLoading === false when action.type === "RECEIVED_CHANNEL_MESSAGES"', () => {
    const action: any = {
      type: 'RECEIVED_CHANNEL_MESSAGES',
      payload: [message],
    };
    const expected = {
      ...initialState,
      list: [message],
    };
    const result = MessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return error when action.type === "RECEIVED_CHANNEL_MESSAGES_ERROR"', () => {
    const error = 'this error';
    const action: any = {
      type: 'RECEIVED_CHANNEL_MESSAGES_ERROR',
      payload: error,
    };
    const expected = {
      ...initialState,
      error,
    };
    const result = MessagesReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
