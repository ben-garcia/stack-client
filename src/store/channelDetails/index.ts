// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  ChannelDetailsState as ChannelDetailsStateAlias,
  ChannelDetailsActionTypes as ChannelDetailsActionTypesAlias,
} from './types';
import ChannelDetailsReducerAlias from './reducer';

export {
  closeChannelDetails,
  openChannelDetails,
  openChannelDetailsWithMembers,
} from './actions';
export { ChannelDetailsActions } from './types';

export type ChannelDetailsState = ChannelDetailsStateAlias;
export type ChannelDetailsActionTypes = ChannelDetailsActionTypesAlias;
export const channelDetailsReducer = ChannelDetailsReducerAlias;
