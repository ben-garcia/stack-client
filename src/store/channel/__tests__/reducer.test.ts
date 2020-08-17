import ChannelReducer from '../reducer';

describe('ChannelReducer', () => {
  const initialState = {
    id: 0,
    name: '',
    topic: '',
    description: '',
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = ChannelReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new channel when action.type === "GET_CURRENT_CHANNEL"', () => {
    const payload = {
      id: 1,
      name: 'channel name',
      topic: 'channel topic',
      description: 'channel description',
    };
    const action: any = { type: 'GET_CURRENT_CHANNEL', payload };
    const result = ChannelReducer(initialState, action);
    expect(result).toEqual(payload);
  });

  it('return channel with updated topic when action.type === "UPDATE_CHANNEL_TOPIC"', () => {
    const payload = 'new channel topic';
    const action: any = {
      type: 'UPDATE_CHANNEL_TOPIC',
      payload,
    };
    const result = ChannelReducer(initialState, action);
    const expected = { ...initialState, topic: payload };
    expect(result).toEqual(expected);
  });

  it('return channel with updated description when action.type === "UPDATE_CHANNEL_DESCRIPTION"', () => {
    const payload = 'new channel description';
    const action: any = {
      type: 'UPDATE_CHANNEL_DESCRIPTION',
      payload,
    };
    const result = ChannelReducer(initialState, action);
    const expected = { ...initialState, description: payload };
    expect(result).toEqual(expected);
  });
});
