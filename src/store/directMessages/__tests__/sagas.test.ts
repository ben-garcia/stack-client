import { runSaga } from 'redux-saga';

import * as api from 'api';
import {
  receivedUserDirectMessages,
  receivedUserDirectMessagesError,
} from '../actions';
import getUserDirectMessages, {
  getCurrentWorkspaceId,
  getCurrentTeammates,
  getCurrentTeammateId,
} from '../sagas';

describe('directMessages sagas', () => {
  const teammates = {
    list: [
      { id: 1, username: 'user111' },
      { id: 2, username: 'user222' },
    ],
  };
  const currentTeammate = { id: 1 };
  const currentWorkspace = { id: 1 };
  const state = { currentTeammate, currentWorkspace, teammates };

  describe('selectors', () => {
    it('should return the correct id from currentWorkspace', () => {
      const received = getCurrentWorkspaceId(state as any);
      expect(received).toBe(state.currentWorkspace.id);
    });

    it('should return the correct id from currentTeammate', () => {
      const received = getCurrentTeammateId(state as any);
      expect(received).toBe(state.currentTeammate.id);
    });

    it('should return the correct teammates', () => {
      const received = getCurrentTeammates(state as any);
      expect(received).toEqual(state.teammates.list);
    });
  });

  describe('getUserDirectMessages saga', () => {
    it('should dispatch correct action when fetching direct messages is successful', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const directMessages = [
        { id: 1, user: { username: 'user111' } },
        { id: 2, user: { username: 'user222' } },
      ];
      const data = { data: { directMessages } };

      (api as any).sendRequest = jest.fn(() => Promise.resolve(data));

      await runSaga(mockStore, getUserDirectMessages as any).toPromise();

      expect(api.sendRequest).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toEqual(
        receivedUserDirectMessages(directMessages as any)
      );
    });

    it('should dispatch an error when fetching direct messages is fails', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const error = 'error was thrown';

      (api as any).sendRequest = jest.fn(() =>
        Promise.reject(new Error(error))
      );

      await runSaga(mockStore, getUserDirectMessages as any).toPromise();

      expect(dispatchedActions[0]).toEqual(
        receivedUserDirectMessagesError(error)
      );
    });
  });
});
