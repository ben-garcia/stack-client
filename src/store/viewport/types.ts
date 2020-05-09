export enum ViewportActions {
  VIEWPORT_IS_PHONE = 'VIEWPORT_IS_PHONE',
  VIEWPORT_IS_TABLET = 'VIEWPORT_IS_TABLET',
  VIEWPORT_IS_DESKTOP = 'VIEWPORT_IS_DESKTOP',
}

export interface ViewportState {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface ViewportIsPhone {
  type: typeof ViewportActions.VIEWPORT_IS_PHONE;
}

interface ViewportIsTablet {
  type: typeof ViewportActions.VIEWPORT_IS_TABLET;
}

interface ViewportIsDesktop {
  type: typeof ViewportActions.VIEWPORT_IS_DESKTOP;
}

export type ViewportActionTypes =
  | ViewportIsPhone
  | ViewportIsTablet
  | ViewportIsDesktop;
