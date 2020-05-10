import {
  MobileSidebarActions,
  MobileSidebarActionTypes,
  MobileSidebarState,
} from './types';

const initialState: MobileSidebarState = false;

const MobileSidebarReducer = (
  state: Readonly<MobileSidebarState> = initialState,
  action: MobileSidebarActionTypes
): MobileSidebarState => {
  switch (action.type) {
    case MobileSidebarActions.OPEN_MOBILE_SIDEBAR:
      return true;
    case MobileSidebarActions.CLOSE_MOBILE_SIDEBAR:
      return false;
    default:
      return state;
  }
};

export default MobileSidebarReducer;
