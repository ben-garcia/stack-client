import { runSaga } from 'redux-saga';

import * as api from 'api';
import {
  receivedUserWorkspaces,
  receivedUserWorkspacesError,
} from '../actions';
import getAllCurrentWorkspaceChannels from '../sagas';

describe('channels sagas', () => {
  const state = { workspaces: { list: [{ id: 1 }, { id: 2 }] } };

  describe('getAllCurrentWorkspaceChannels saga', () => {
    it('should dispatch correct action when fetching workspaces is successful', async () => {
      const dispatchedActions: any[] = [];
      const mockStore = {
        getState: () => state,
        dispatch: (action: any) => dispatchedActions.push(action),
      };
      const workspaces = [{ id: 1 }, { id: 2 }];
      const data = { data: { workspaces } };

      (api as any).sendRequest = jest.fn(() => Promise.resolve(data));

      await runSaga(
        mockStore,
        getAllCurrentWorkspaceChannels as any
      ).toPromise();

      expect(api.sendRequest).toHaveBeenCalledTimes(1);
      expect(dispatchedActions[0]).toEqual(
        receivedUserWorkspaces(workspaces as any)
      );
    });

    it('should dispatch an error when fetching workspaces fails', async () => {
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

      expect(dispatchedActions[0]).toEqual(receivedUserWorkspacesError(error));
    });
  });
});
