export enum MobileSidebarActions {
  OPEN_MOBILE_SIDEBAR = 'OPEN_MOBILE_SIDEBAR',
  CLOSE_MOBILE_SIDEBAR = 'CLOSE_MOBILE_SIDEBAR',
}

export type MobileSidebarState = boolean;

interface openMobileSidebar {
  type: typeof MobileSidebarActions.OPEN_MOBILE_SIDEBAR;
}

interface closeMoblieSidebar {
  type: typeof MobileSidebarActions.CLOSE_MOBILE_SIDEBAR;
}

export type MobileSidebarActionTypes = openMobileSidebar | closeMoblieSidebar;
