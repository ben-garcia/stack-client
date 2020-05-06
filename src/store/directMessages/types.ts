export enum DirectMessagesActions {
  ADD_DIRECT_MESSAGE = 'ADD_DIRECT_MESSAGE',
  CLEAR_DIRECT_MESSAGES = 'CLEAR_DIRECT_MESSAGES',
  REQUEST_USER_DIRECT_MESSAGES = 'REQUEST_USER_DIRECT_MESSAGES',
  RECEIVED_USER_DIRECT_MESSAGES = 'RECEIVED_USER_DIRECT_MESSAGES',
  RECEIVED_USER_DIRECT_MESSAGES_ERROR = 'RECEIVED_USER_DIRECT_MESSAGES_ERROR',
}

export interface DirectMessage {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: { color: string; username: string };
}

export type DirectMessagesError = string;

export interface DirectMessagesState {
  error?: DirectMessagesError;
  isLoading: boolean;
  list: DirectMessage[];
}

interface AddDirectMessage {
  type: typeof DirectMessagesActions.ADD_DIRECT_MESSAGE;
  payload: DirectMessage;
}

interface ClearDirectMessages {
  type: typeof DirectMessagesActions.CLEAR_DIRECT_MESSAGES;
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
  | ClearDirectMessages
  | RequestDirectMessages
  | ReceivedUserDirectMessages
  | ReceivedUserDirectMessagesError;
