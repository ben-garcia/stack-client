import EditChannelDescriptionModalReducer from '../reducer';

describe('ChannelReducer', () => {
  const initialState = false;

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = EditChannelDescriptionModalReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return true when action.type === "OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL"', () => {
    const action: any = { type: 'OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL' };
    const result = EditChannelDescriptionModalReducer(initialState, action);
    expect(result).toEqual(true);
  });

  it('return false when action.type === "CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL"', () => {
    const action: any = { type: 'CLOSE_EDIT_CHANNEL_DESCRIPTION_MODAL' };
    const result = EditChannelDescriptionModalReducer(initialState, action);
    expect(result).toEqual(false);
  });
});
