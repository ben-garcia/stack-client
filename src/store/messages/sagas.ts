import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import {
  receivedChannelMessages,
  receivedChannelMessagesError,
} from './actions';

// selector to get the current channel id
const getCurrentChannelId = (state: AppState) => state.currentChannel.id;

function* getAllChannelMessages() {
  try {
    const currentChannelId = yield select(getCurrentChannelId);
    const {
      data: { messages },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/channels/${currentChannelId}`,
    });

    // dispatch action
    yield put(receivedChannelMessages(messages));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getChannelMessages saga error: ', e);
    // dispatch an error
    yield put(receivedChannelMessagesError(e.message));
  }
}

export default getAllChannelMessages;
