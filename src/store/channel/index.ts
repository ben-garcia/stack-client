// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  ChannelState as ChannelStateAlias,
  ChannelActionTypes as ChannelActionTypesAlias,
} from './types';
import ChannelReducer from './reducer';

export {
  getCurrentChannel,
  updateChannelTopic,
  updateChannelDescription,
} from './actions';
export { ChannelActions } from './types';

export type ChannelState = ChannelStateAlias;
export type ChannelActionTypes = ChannelActionTypesAlias;
export const channelReducer = ChannelReducer;
