import {
  ChannelMessagesActions,
  ChannelMessagesError,
  ChannelMessage,
  ChannelMessagesActionTypes,
} from './types';

export const addChannelMessage = (
  message: ChannelMessage
): ChannelMessagesActionTypes => ({
  type: ChannelMessagesActions.ADD_CHANNEL_MESSAGE,
  payload: message,
});

export const clearChannelMessages = (): ChannelMessagesActionTypes => ({
  type: ChannelMessagesActions.CLEAR_CHANNEL_MESSAGES,
});

export const receivedChannelMessages = (
  messages: ChannelMessage[]
): ChannelMessagesActionTypes => ({
  type: ChannelMessagesActions.RECEIVED_CHANNEL_MESSAGES,
  payload: messages,
});

export const receivedChannelMessagesError = (
  error: ChannelMessagesError
): ChannelMessagesActionTypes => ({
  type: ChannelMessagesActions.RECEIVED_CHANNEL_MESSAGES_ERROR,
  payload: error,
});

export const requestChannelMessages = (): ChannelMessagesActionTypes => ({
  type: ChannelMessagesActions.REQUEST_CHANNEL_MESSAGES,
});
