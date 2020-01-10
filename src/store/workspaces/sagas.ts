import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import { receivedUserWorkspaces, receivedUserWorkspacesError } from './actions';

// selector to retrieve the user's id
const getUserId = (state: AppState) => state.user.id;

function* getUserWorkspaces() {
  try {
    const userId = yield select(getUserId);
    // get workspaces by calling api using call effect
    const {
      data: { workspaces },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/workspaces?userId=${userId}`,
    });

    // dispatch the action
    yield put(receivedUserWorkspaces(workspaces));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getUserWorkspaces saga Error: ', e);
    // dispatch an error
    yield put(receivedUserWorkspacesError(e.message));
  }
}

export default getUserWorkspaces;
