// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  ChannelMessage as ChannelMessageAlias,
  ChannelMessagesState as ChannelMessagesStateAlias,
  ChannelMessagesActionTypes as ChannelMessagesActionTypesAlias,
} from './types';
import MessagesReducer from './reducer';
import GetAllChannelMessages from './sagas';

export {
  addChannelMessage,
  clearChannelMessages,
  requestChannelMessages,
  receivedChannelMessages,
  receivedChannelMessagesError,
} from './actions';
export { ChannelMessagesActions } from './types';

export type ChannelMessage = ChannelMessageAlias;
export type MessagesState = ChannelMessagesStateAlias;
export type MessagesActionTypes = ChannelMessagesActionTypesAlias;
export const channelMessagesReducer = MessagesReducer;
export const getAllChannelMessages = GetAllChannelMessages;
