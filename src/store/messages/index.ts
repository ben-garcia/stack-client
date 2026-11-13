// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  ChannelMessage as MessageAlias,
  MessagesState as MessagesStateAlias,
  MessagesActionTypes as MessagesActionTypesAlias,
} from './types';
import MessagesReducer from './reducer';
import GetAllChannelMessages from './sagas';

export {
  addMessage,
  clearMessages,
  requestChannelMessages,
  receivedChannelMessages,
  receivedChannelMessagesError,
} from './actions';
export { MessagesActions } from './types';

export type ChannelMessage = MessageAlias;
export type MessagesState = MessagesStateAlias;
export type MessagesActionTypes = MessagesActionTypesAlias;
export const messagesReducer = MessagesReducer;
export const getAllChannelMessages = GetAllChannelMessages;
