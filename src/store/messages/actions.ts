import {
  MessagesActions,
  MessagesError,
  Message,
  MessagesActionTypes,
} from './types';

export const addMessage = (message: Message): MessagesActionTypes => ({
  type: MessagesActions.ADD_MESSAGE,
  payload: message,
});

export const receivedChannelMessages = (
  messages: Message[]
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
