import { call, put, select } from 'redux-saga/effects';

import { sendRequest, userColors } from 'api';
import { AppState } from 'store';
import { Teammate } from 'store/teammates';
import {
  receivedWorkspaceTeammates,
  receivedWorkspaceTeammatesError,
} from './actions';

// selector to get the current workspace id
export const getCurrentWorkspaceId = (state: AppState) =>
  state.currentWorkspace.id;
export const getCurrentUserId = (state: AppState) => state.user.id;

function* GetAllCurrentWorkspaceTeammates() {
  try {
    const currentWorkspaceId = yield select(getCurrentWorkspaceId);
    const currentUserId = yield select(getCurrentUserId);
    const {
      data: { teammates },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/workspaces/${currentWorkspaceId}`,
    });

    if (teammates.length < 13) {
      teammates.forEach((t: Teammate, i: number) => {
        if (currentUserId === t.id) {
          // the user will have purple
          // eslint-disable-next-line
          t.color = 'purple';
        } else {
          // eslint-disable-next-line
          t.color = userColors[i];
        }
      });
    }
    // dispatch the action
    yield put(receivedWorkspaceTeammates(teammates));
  } catch (e) {
    // eslint-disable-next-line
    // console.log('getWorkspaceMembers saga error: ', e);
    // dispatch an error
    yield put(receivedWorkspaceTeammatesError(e.message));
  }
}

export default GetAllCurrentWorkspaceTeammates;
