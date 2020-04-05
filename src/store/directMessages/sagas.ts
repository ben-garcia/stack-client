import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import {
  receivedUserDirectMessages,
  receivedUserDirectMessagesError,
} from './actions';

// selector to get the current user id
const getCurrentUserId = (state: AppState) => state.user.id;

function* getUserDirectMessages() {
  try {
    const currentUserId = yield select(getCurrentUserId);
    const {
      data: { messages },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/direct-messages?userId=${currentUserId}`,
    });

    // dispatch action
    yield put(receivedUserDirectMessages(messages));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getUserDirectMessages saga error: ', e);
    // dispatch an error
    yield put(receivedUserDirectMessagesError(e.message));
  }
}

export default getUserDirectMessages;
