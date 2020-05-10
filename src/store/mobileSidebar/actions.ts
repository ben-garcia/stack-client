import { MobileSidebarActions, MobileSidebarActionTypes } from './types';

export const openMobileSidebar = (): MobileSidebarActionTypes => ({
  type: MobileSidebarActions.OPEN_MOBILE_SIDEBAR,
});

export const closeMobileSidebar = (): MobileSidebarActionTypes => ({
  type: MobileSidebarActions.CLOSE_MOBILE_SIDEBAR,
});
