export enum ChannelMessagesActions {
  ADD_CHANNEL_MESSAGE = 'ADD_CHANNEL_MESSAGE',
  CLEAR_CHANNEL_MESSAGES = 'CLEAR_CHANNEL_MESSAGES',
  REQUEST_CHANNEL_MESSAGES = 'REQUEST_CHANNEL_MESSAGES',
  RECEIVED_CHANNEL_MESSAGES = 'RECEIVED_CHANNEL_MESSAGES',
  RECEIVED_CHANNEL_MESSAGES_ERROR = 'RECEIVED_CHANNEL_MESSAGES_ERROR',
}

export interface ChannelMessage {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: { color: string; username: string };
}

export type ChannelMessagesError = string;

export interface ChannelMessagesState {
  isLoading: boolean;
  error?: ChannelMessagesError;
  list: ChannelMessage[];
}

interface AddChannelMessage {
  type: typeof ChannelMessagesActions.ADD_CHANNEL_MESSAGE;
  payload: ChannelMessage;
}

interface ClearChannelMessages {
  type: typeof ChannelMessagesActions.CLEAR_CHANNEL_MESSAGES;
}

interface ReceivedChannelMessages {
  type: typeof ChannelMessagesActions.RECEIVED_CHANNEL_MESSAGES;
  payload: ChannelMessage[];
}

interface ReceivedChannelMessagesError {
  type: typeof ChannelMessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR;
  payload: ChannelMessagesError;
}

interface RequestChannelMessages {
  type: typeof ChannelMessagesActions.REQUEST_CHANNEL_MESSAGES;
}

export type ChannelMessagesActionTypes =
  | AddChannelMessage
  | ClearChannelMessages
  | RequestChannelMessages
  | ReceivedChannelMessages
  | ReceivedChannelMessagesError;
