// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  DirectMessage as DirectMessageAlias,
  DirectMessagesState as DirectMessagesStateAlias,
  DirectMessagesActionTypes as DirectMessagesActionTypesAlias,
} from './types';
import DirectMessagesReducer from './reducer';
import GetUserDirectMessages from './sagas';

export {
  addUserDirectMessage,
  requestUserDirectMessages,
  receivedUserDirectMessages,
  receivedUserDirectMessagesError,
} from './actions';
export { DirectMessagesActions } from './types';

export type Message = DirectMessageAlias;
export type MessagesState = DirectMessagesStateAlias;
export type MessagesActionTypes = DirectMessagesActionTypesAlias;
export const directMessagesReducer = DirectMessagesReducer;
export const getUserDirectMessages = GetUserDirectMessages;
