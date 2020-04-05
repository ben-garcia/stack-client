import {
  DirectMessagesActions,
  DirectMessagesError,
  DirectMessage,
  DirectMessagesActionTypes,
} from './types';

export const addUserDirectMessage = (
  message: DirectMessage
): DirectMessagesActionTypes => ({
  type: DirectMessagesActions.ADD_DIRECT_MESSAGE,
  payload: message,
});

export const clearDirectMessages = (): DirectMessagesActionTypes => ({
  type: DirectMessagesActions.CLEAR_DIRECT_MESSAGES,
});

export const requestUserDirectMessages = (): DirectMessagesActionTypes => ({
  type: DirectMessagesActions.REQUEST_USER_DIRECT_MESSAGES,
});

export const receivedUserDirectMessages = (
  messages: DirectMessage[]
): DirectMessagesActionTypes => ({
  type: DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES,
  payload: messages,
});

export const receivedUserDirectMessagesError = (
  error: DirectMessagesError
): DirectMessagesActionTypes => ({
  type: DirectMessagesActions.RECEIVED_USER_DIRECT_MESSAGES_ERROR,
  payload: error,
});
