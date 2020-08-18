import {
  addUserDirectMessage,
  clearDirectMessages,
  requestUserDirectMessages,
  receivedUserDirectMessages,
  receivedUserDirectMessagesError,
} from '../actions';

describe('directMessages actions', () => {
  const directMessage = {
    content: 'content',
    createdAt: '',
    id: 1,
    updatedAt: '',
    user: { color: '', username: 'user644' },
  };

  describe('addUserDirectMessage', () => {
    it('should return object correct type with the direct message', () => {
      const result = addUserDirectMessage(directMessage);
      const expected = {
        type: 'ADD_DIRECT_MESSAGE',
        payload: directMessage,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('clearDirectMessages', () => {
    it('should return object correct type', () => {
      const result = clearDirectMessages();
      const expected = {
        type: 'CLEAR_DIRECT_MESSAGES',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('requestUserDirectMessages', () => {
    it('should return object correct type', () => {
      const result = requestUserDirectMessages();
      const expected = {
        type: 'REQUEST_USER_DIRECT_MESSAGES',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedUserDirectMessages', () => {
    it('should return object correct type', () => {
      const result = receivedUserDirectMessages([directMessage, directMessage]);
      const expected = {
        type: 'RECEIVED_USER_DIRECT_MESSAGES',
        payload: [directMessage, directMessage],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedUserDirectMessagesError', () => {
    it('should return object correct type', () => {
      const error = 'error';
      const result = receivedUserDirectMessagesError(error);
      const expected = {
        type: 'RECEIVED_USER_DIRECT_MESSAGES_ERROR',
        payload: error,
      };
      expect(result).toEqual(expected);
    });
  });
});
