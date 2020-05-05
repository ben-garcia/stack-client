export enum MessagesActions {
  ADD_MESSAGE = 'ADD_MESSAGE',
  CLEAR_MESSAGES = 'CLEAR_MESSAGES',
  REQUEST_CHANNEL_MESSAGES = 'REQUEST_CHANNEL_MESSAGES',
  RECEIVED_CHANNEL_MESSAGES = 'RECEIVED_CHANNEL_MESSAGES',
  RECEIVED_CHANNEL_MESSAGES_ERROR = 'RECEIVED_CHANNEL_MESSAGES_ERROR',
}

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: { color: string; username: string };
}

export type MessagesError = string;

export interface MessagesState {
  isLoading: boolean;
  error?: MessagesError;
  list: Message[];
}

interface AddMessage {
  type: typeof MessagesActions.ADD_MESSAGE;
  payload: Message;
}

interface ClearMessages {
  type: typeof MessagesActions.CLEAR_MESSAGES;
}

interface ReceivedChannelMessages {
  type: typeof MessagesActions.RECEIVED_CHANNEL_MESSAGES;
  payload: Message[];
}

interface ReceivedChannelMessagesError {
  type: typeof MessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR;
  payload: MessagesError;
}

interface RequestChannelMessages {
  type: typeof MessagesActions.REQUEST_CHANNEL_MESSAGES;
}

export type MessagesActionTypes =
  | AddMessage
  | ClearMessages
  | RequestChannelMessages
  | ReceivedChannelMessages
  | ReceivedChannelMessagesError;
