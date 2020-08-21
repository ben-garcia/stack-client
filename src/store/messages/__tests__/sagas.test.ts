import { runSaga } from 'redux-saga';

import * as api from 'api';
import {
  receivedChannelMessages,
  receivedChannelMessagesError,
} from '../actions';
import getAllChannelMessages, {
  getCurrentTeammates,
  getCurrentChannelId,
} from '../sagas';

describe('messages sagas', () => {
  const teammates = {
    list: [
      { id: 1, username: 'user111' },
      { id: 2, username: 'user222' },
    ],
  };
  const currentChannel = { id: 1 };
  const state = { currentChannel, teammates };

  describe('selectors', () => {
    it('should return the correct id from currentChannel', () => {
      const received = getCurrentChannelId(state as any);
      expect(received).toBe(state.currentChannel.id);
    });

    it('should return the correct teammates', () => {
      const received = getCurrentTeammates(state as any);
      expect(received).toEqual(state.teammates.list);
    });
  });

  describe('getAllChannelMessages saga', () => {
    it('should dispatch correct action when fetching messages is successful', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const messages = [
        { id: 1, user: { username: 'user111' } },
        { id: 2, user: { username: 'user222' } },
      ];
      const data = { data: { messages } };

      (api as any).sendRequest = jest.fn(() => Promise.resolve(data));

      await runSaga(mockStore, getAllChannelMessages as any).toPromise();

      expect(api.sendRequest).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toEqual(
        receivedChannelMessages(messages as any)
      );
    });

    it('should dispatch an error when fetching messages fails', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const error = 'error was thrown';

      (api as any).sendRequest = jest.fn(() =>
        Promise.reject(new Error(error))
      );

      await runSaga(mockStore, getAllChannelMessages as any).toPromise();

      expect(dispatchedActions[0]).toEqual(receivedChannelMessagesError(error));
    });
  });
});
