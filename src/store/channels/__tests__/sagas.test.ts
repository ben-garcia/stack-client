import { runSaga } from 'redux-saga';

import * as api from 'api';
import {
  receivedWorkspaceChannels,
  receivedWorkspaceChannelsError,
} from '../actions';
import getAllCurrentWorkspaceChannels, {
  getCurrentWorkspaceId,
} from '../sagas';

describe('channels sagas', () => {
  const state = { currentWorkspace: { id: 1 } };

  describe('getCurrentWorkspaceId selector', () => {
    it('should return the correct id from currentWorkspac', () => {
      const received = getCurrentWorkspaceId(state as any);
      expect(received).toBe(state.currentWorkspace.id);
    });
  });

  describe('getAllCurrentWorkspaceChannels saga', () => {
    it('should dispatch correct action when fetching channels is successful', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const channels = [{ id: 1 }, { id: 2 }];
      const data = { data: { channels } };

      (api as any).sendRequest = jest.fn(() => Promise.resolve(data));

      await runSaga(
        mockStore,
        getAllCurrentWorkspaceChannels as any
      ).toPromise();

      expect(api.sendRequest).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toEqual(
        receivedWorkspaceChannels(channels as any)
      );
    });

    it('should dispatch an error when fetching channels is fails', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const error = 'error was thrown';

      (api as any).sendRequest = jest.fn(() =>
        Promise.reject(new Error(error))
      );

      await runSaga(
        mockStore,
        getAllCurrentWorkspaceChannels as any
      ).toPromise();

      expect(dispatchedActions[0]).toEqual(
        receivedWorkspaceChannelsError(error)
      );
    });
  });
});
