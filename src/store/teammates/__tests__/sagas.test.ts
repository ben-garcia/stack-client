import { runSaga } from 'redux-saga';

import * as api from 'api';
import {
  receivedWorkspaceTeammates,
  receivedWorkspaceTeammatesError,
} from '../actions';
import getUserDirectMessages, {
  getCurrentWorkspaceId,
  getCurrentUserId,
} from '../sagas';

describe('teammates sagas', () => {
  const currentWorkspace = { id: 1 };
  const user = { id: 1 };
  const state = { currentWorkspace, user };

  describe('selectors', () => {
    it('should return the correct id from currentWorkspace', () => {
      const received = getCurrentWorkspaceId(state as any);
      expect(received).toBe(state.currentWorkspace.id);
    });

    it('should return the correct id from user', () => {
      const received = getCurrentUserId(state as any);
      expect(received).toBe(state.user.id);
    });
  });

  describe('getAllCurrentWorkspaceTeammates saga', () => {
    it('should dispatch correct action when fetching teammates is successful', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const teammates = [
        { id: 1, username: 'user111' },
        { id: 2, username: 'user222' },
      ];
      const data = { data: { teammates } };

      (api as any).sendRequest = jest.fn(() => Promise.resolve(data));

      await runSaga(mockStore, getUserDirectMessages as any).toPromise();

      expect(api.sendRequest).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toEqual(
        receivedWorkspaceTeammates(teammates as any)
      );
    });

    it('should dispatch an error when fetching teammates fails', async () => {
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
        receivedWorkspaceTeammatesError(error)
      );
    });
  });
});
