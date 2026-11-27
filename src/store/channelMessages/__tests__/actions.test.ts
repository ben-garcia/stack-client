import {
  addChannelMessage,
  clearChannelMessages,
  receivedChannelMessages,
  receivedChannelMessagesError,
  requestChannelMessages,
} from '../actions';

describe('messages actions', () => {
  const message = {
    content: 'content',
    createdAt: '',
    id: 1,
    updatedAt: '',
    user: { color: '', username: 'user644' },
  };

  describe('addChannelMessage', () => {
    it('should return object correct type with the message', () => {
      const result = addChannelMessage(message);
      const expected = {
        type: 'ADD_CHANNEL_MESSAGE',
        payload: message,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('clearChannelMessages', () => {
    it('should return object correct type', () => {
      const result = clearChannelMessages();
      const expected = {
        type: 'CLEAR_CHANNEL_MESSAGES',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('requestChannelMessages', () => {
    it('should return object correct type', () => {
      const result = requestChannelMessages();
      const expected = {
        type: 'REQUEST_CHANNEL_MESSAGES',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedChannelMessages', () => {
    it('should return object correct type', () => {
      const result = receivedChannelMessages([message, message]);
      const expected = {
        type: 'RECEIVED_CHANNEL_MESSAGES',
        payload: [message, message],
      };
      expect(result).toEqual(expected);
    });
  });

  describe('receivedChannelMessagesError', () => {
    it('should return object correct type', () => {
      const error = 'error';
      const result = receivedChannelMessagesError(error);
      const expected = {
        type: 'RECEIVED_CHANNEL_MESSAGES_ERROR',
        payload: error,
      };
      expect(result).toEqual(expected);
    });
  });
});
