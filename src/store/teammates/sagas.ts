import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import {
  receivedWorkspaceTeammates,
  receivedWorkspaceTeammatesError,
} from './actions';

// selector to get the current workspace id
const getCurrentWorkspaceId = (state: AppState) => state.currentWorkspace.id;

function* GetAllCurrentWorkspaceTeammates() {
  try {
    const currentWorkspaceId = yield select(getCurrentWorkspaceId);
    const {
      data: { teammates },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/workspaces/${currentWorkspaceId}`,
    });

    // dispatch the action
    yield put(receivedWorkspaceTeammates(teammates));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getWorkspaceMembers saga error: ', e);
    // dispatch an error
    yield put(receivedWorkspaceTeammatesError(e.message));
  }
}

export default GetAllCurrentWorkspaceTeammates;
