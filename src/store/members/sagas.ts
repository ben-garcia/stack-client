import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import {
  receivedWorkspaceMembers,
  receivedWorkspaceMembersError,
} from './actions';

// selector to get the current workspace id
const getCurrentWorkspaceId = (state: AppState) => state.currentWorkspaceId;

function* getAllCurrentWorkspaceMembers() {
  try {
    const currentWorkspaceId = yield select(getCurrentWorkspaceId);
    const {
      data: { members },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/workspaces/${currentWorkspaceId}`,
    });

    // dispatch the action
    yield put(receivedWorkspaceMembers(members));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getWorkspaceMembers saga error: ', e);
    // dispatch an error
    yield put(receivedWorkspaceMembersError(e.message));
  }
}

export default getAllCurrentWorkspaceMembers;
