import {
  MessagesActions,
  MessagesError,
  ChannelMessage,
  MessagesActionTypes,
} from './types';

export const addMessage = (message: ChannelMessage): MessagesActionTypes => ({
  type: MessagesActions.ADD_MESSAGE,
  payload: message,
});

export const clearMessages = (): MessagesActionTypes => ({
  type: MessagesActions.CLEAR_MESSAGES,
});

export const receivedChannelMessages = (
  messages: ChannelMessage[]
): MessagesActionTypes => ({
  type: MessagesActions.RECEIVED_CHANNEL_MESSAGES,
  payload: messages,
});

export const receivedChannelMessagesError = (
  error: MessagesError
): MessagesActionTypes => ({
  type: MessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR,
  payload: error,
});

export const requestChannelMessages = (): MessagesActionTypes => ({
  type: MessagesActions.REQUEST_CHANNEL_MESSAGES,
});
