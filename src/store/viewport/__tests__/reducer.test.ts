import ViewportReducer from '../reducer';

describe('ViewportReducer', () => {
  const initialState = { isDesktop: false, isPhone: false, isTablet: false };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = ViewportReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return correct state when action.type === "VIEWPORT_IS_DESKTOP"', () => {
    const action: any = { type: 'VIEWPORT_IS_DESKTOP' };
    const result = ViewportReducer(initialState, action);
    const expected = { ...initialState, isDesktop: true };
    expect(result).toEqual(expected);
  });

  it('return correct state when action.type === "VIEWPORT_IS_PHONE"', () => {
    const action: any = { type: 'VIEWPORT_IS_PHONE' };
    const result = ViewportReducer(initialState, action);
    const expected = { ...initialState, isPhone: true };
    expect(result).toEqual(expected);
  });

  it('return correct state when action.type === "VIEWPORT_IS_TABLET"', () => {
    const action: any = { type: 'VIEWPORT_IS_TABLET' };
    const result = ViewportReducer(initialState, action);
    const expected = { ...initialState, isTablet: true };
    expect(result).toEqual(expected);
  });
});
