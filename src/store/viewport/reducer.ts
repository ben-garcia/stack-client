import { ViewportActions, ViewportState, ViewportActionTypes } from './types';

const initialState: ViewportState = {
  isPhone: false,
  isTablet: false,
  isDesktop: false,
};

const ViewportReducer = (
  state: Readonly<ViewportState> = initialState,
  action: ViewportActionTypes
): ViewportState => {
  switch (action.type) {
    case ViewportActions.VIEWPORT_IS_PHONE:
      return {
        isPhone: true,
        isTablet: false,
        isDesktop: false,
      };
    case ViewportActions.VIEWPORT_IS_TABLET:
      return {
        isPhone: false,
        isTablet: true,
        isDesktop: false,
      };
    case ViewportActions.VIEWPORT_IS_DESKTOP:
      return {
        isPhone: false,
        isTablet: false,
        isDesktop: true,
      };
    default:
      return state;
  }
};

export default ViewportReducer;
