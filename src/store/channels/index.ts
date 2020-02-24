// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  Channel as ChannelAlias,
  ChannelsState as ChannelsStateAlias,
  ChannelsActionTypes as ChannelsActionTypesAlias,
} from './types';
import ChannelsReducer from './reducer';
import getAllCurrentWorkspaceChannels from './sagas';

export {
  addChannel,
  requestWorkspaceChannels,
  receivedWorkspaceChannels,
  receivedWorkspaceChannelsError,
} from './actions';
export { ChannelsActions } from './types';

export type Channel = ChannelAlias;
export type ChannelsState = ChannelsStateAlias;
export type ChannelsActionTypes = ChannelsActionTypesAlias;
export const channelsReducer = ChannelsReducer;
export const getAllWorkspaceChannels = getAllCurrentWorkspaceChannels;
