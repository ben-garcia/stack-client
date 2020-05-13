import { call, put } from 'redux-saga/effects';

import { sendRequest } from 'api';
import { receivedUserWorkspaces, receivedUserWorkspacesError } from './actions';

function* GetUserWorkspaces() {
  try {
    // get workspaces by calling api using call effect
    const {
      data: { workspaces },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/workspaces`,
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

export default GetUserWorkspaces;
