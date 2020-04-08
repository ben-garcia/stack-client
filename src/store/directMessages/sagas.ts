import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import {
  receivedUserDirectMessages,
  receivedUserDirectMessagesError,
} from './actions';

// selector to get the current user id
const getCurrentTeammateId = (state: AppState) => state.currentTeammateId;
const getCurrentWorkspaceId = (state: AppState) => state.currentWorkspaceId;

function* getUserDirectMessages() {
  try {
    const currentUserId = yield select(getCurrentTeammateId);
    const currentWorkspaceId = yield select(getCurrentWorkspaceId);
    const {
      data: { directMessages },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/direct-messages?teammateId=${currentUserId}&workspaceId=${currentWorkspaceId}`,
    });

    // dispatch action
    yield put(receivedUserDirectMessages(directMessages));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getUserDirectMessages saga error: ', e);
    // dispatch an error
    yield put(receivedUserDirectMessagesError(e.message));
  }
}

export default getUserDirectMessages;
