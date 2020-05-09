import { ViewportActions, ViewportActionTypes } from './types';

export const viewportIsPhone = (): ViewportActionTypes => ({
  type: ViewportActions.VIEWPORT_IS_PHONE,
});

export const viewportIsTablet = (): ViewportActionTypes => ({
  type: ViewportActions.VIEWPORT_IS_TABLET,
});

export const viewportIsDesktop = (): ViewportActionTypes => ({
  type: ViewportActions.VIEWPORT_IS_DESKTOP,
});
