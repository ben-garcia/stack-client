// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  ViewportActionTypes as ViewportActionTypesAlias,
  ViewportState as ViewportStateAlias,
} from './types';
import ViewportReducer from './reducer';

export {
  viewportIsPhone,
  viewportIsTablet,
  viewportIsDesktop,
} from './actions';

export type ViewportState = ViewportStateAlias;
export type ViewportActionTypes = ViewportActionTypesAlias;
export const viewportReducer = ViewportReducer;
