export enum DirectMessagesActions {
  ADD_DIRECT_MESSAGE = 'ADD_DIRECT_MESSAGE',
  REQUEST_USER_DIRECT_MESSAGES = 'REQUEST_USER_DIRECT_MESSAGES',
  RECEIVED_USER_DIRECT_MESSAGES = 'RECEIVED_USER_DIRECT_MESSAGES',
  RECEIVED_USER_DIRECT_MESSAGES_ERROR = 'RECEIVED_USER_DIRECT_MESSAGES_ERROR',
}

export interface DirectMessage {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: { username: string };
}

export type DirectMessagesError = string;

export interface DirectMessagesState {
  list: DirectMessage[];
  error?: DirectMessagesError;
}

interface AddDirectMessage {
  type: typeof DirectMessagesActions.ADD_DIRECT_MESSAGE;
  payload: DirectMessage;
}

interface RequestDirectMessages {
  type: typeof DirectMessagesActions.REQUEST_USER_DIRECT_MESSAGES;
}

interface ReceivedUserDirectMessages {
  type: typeof DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES;
  payload: DirectMessage[];
}

interface ReceivedUserDirectMessagesError {
  type: typeof DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES_ERROR;
  payload: DirectMessagesError;
}

export type DirectMessagesActionTypes =
  | AddDirectMessage
  | RequestDirectMessages
  | ReceivedUserDirectMessages
  | ReceivedUserDirectMessagesError;
