import ChannelsReducer from '../reducer';
import { ChannelsState } from '../types';

describe('ChannelsReducer', () => {
  const initialState: ChannelsState = { list: [], isLoading: false };
  const channel = {
    id: 1,
    name: 'channel name',
    topic: 'channel topic',
    description: 'channel description',
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = ChannelsReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new channel to the list when action.type === "ADD_CHANNEL"', () => {
    const action: any = {
      type: 'ADD_CHANNEL',
      payload: channel,
    };
    const expected = {
      ...initialState,
      list: [channel],
    };
    const result = ChannelsReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return no channels when action.type === "CLEAR_CHANNEL"', () => {
    const action: any = {
      type: 'CLEAR_CHANNEL',
    };
    const result = ChannelsReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return isLoading === true when action.type === "REQUEST_WORKSPACE_CHANNELS"', () => {
    const action: any = {
      type: 'REQUEST_WORKSPACE_CHANNELS',
    };
    const expected = {
      ...initialState,
      isLoading: true,
    };
    const result = ChannelsReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return isLoading === false when action.type === "REQUEST_WORKSPACE_CHANNELS"', () => {
    const action: any = {
      type: 'RECEIVED_WORKSPACE_CHANNELS',
      payload: [channel],
    };
    const expected = {
      ...initialState,
      list: [channel],
    };
    const result = ChannelsReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return error when action.type === "REQUEST_WORKSPACE_CHANNELS_ERROR"', () => {
    const error = 'this error';
    const action: any = {
      type: 'RECEIVED_WORKSPACE_CHANNELS_ERROR',
      payload: error,
    };
    const expected = {
      ...initialState,
      error,
    };
    const result = ChannelsReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
