// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  MobileSidebarActionTypes as MobileSidebarActionTypesAlias,
  MobileSidebarState as MobileSidebarStateAlias,
} from './types';

import MobileSidebarReducer from './reducer';

export { closeMobileSidebar, openMobileSidebar } from './actions';

export { MobileSidebarActions } from './types';

export type MobileSidebarState = MobileSidebarStateAlias;
export type MobileSidebarActionTypes = MobileSidebarActionTypesAlias;
export const mobileSidebarReducer = MobileSidebarReducer;
