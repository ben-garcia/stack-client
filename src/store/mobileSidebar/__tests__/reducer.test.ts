import MobileSidebarReducer from '../reducer';

describe('MobileSidebarReducer', () => {
  const initialState = false;

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = MobileSidebarReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return true when action.type === "OPEN_MOBILE_SIDEBAR"', () => {
    const action: any = { type: 'OPEN_MOBILE_SIDEBAR' };
    const result = MobileSidebarReducer(initialState, action);
    expect(result).toEqual(true);
  });

  it('return false when action.type === "CLOSE_MOBILE_SIDEBAR"', () => {
    const action: any = { type: 'CLOSE_MOBILE_SIDEBAR' };
    const result = MobileSidebarReducer(initialState, action);
    expect(result).toEqual(false);
  });
});
