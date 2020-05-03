import { call, put, select } from 'redux-saga/effects';

import { sendRequest } from 'api';
import { AppState } from 'store';
import {
  receivedChannelMessages,
  receivedChannelMessagesError,
} from './actions';

// selector to get the current channel id
const getCurrentChannelId = (state: AppState) => state.currentChannel.id;
const getCurrentTeammates = (state: AppState) => state.teammates.list;

function* getAllChannelMessages() {
  try {
    const currentChannelId = yield select(getCurrentChannelId);
    const currentTeammates = yield select(getCurrentTeammates);
    const {
      data: { messages },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/messages?channelId=${currentChannelId}`,
    });

    for (let i = 0; i < messages.length; i += 1) {
      for (let j = 0; j < currentTeammates.length; j += 1) {
        if (messages[i].user.username === currentTeammates[j].username) {
          messages[i].user.color = currentTeammates[j].color;
        }
      }
    }

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
