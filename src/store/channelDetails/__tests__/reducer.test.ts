import ChannelDetailsReducer from '../reducer';

describe('ChannelDetailsReducer', () => {
  const initialState = {
    isOpen: false,
  };

  it('should return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = ChannelDetailsReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should return new state when action.type === "OPEN_CHANNEL_DETAILS"', () => {
    const action: any = { type: 'OPEN_CHANNEL_DETAILS' };
    const result = ChannelDetailsReducer(initialState, action);
    const expected = {
      isOpen: true,
      withMembers: false,
    };
    expect(result).toEqual(expected);
  });

  it('should return new state when action.type === "OPEN_CHANNEL_DETAILS_WITH_MEMBERS"', () => {
    const action: any = { type: 'OPEN_CHANNEL_DETAILS_WITH_MEMBERS' };
    const result = ChannelDetailsReducer(initialState, action);
    const expected = {
      isOpen: true,
      withMembers: true,
    };
    expect(result).toEqual(expected);
  });

  it('should return new state when action.type === "CLOSE_CHANNEL_DETAILS"', () => {
    const action: any = { type: 'CLOSE_CHANNEL_DETAILS_WITH_MEMBERS' };
    const result = ChannelDetailsReducer(initialState, action);
    const expected = {
      isOpen: false,
    };
    expect(result).toEqual(expected);
  });
});
