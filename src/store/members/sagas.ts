import { call, put, select } from 'redux-saga/effects';

import sendRequest from 'api';
import { AppState } from 'store';
import { receivedChannelMembers, receivedChannelMembersError } from './actions';

// selector to get the current channel id
const getCurrentChannelId = (state: AppState) => state.currentChannel.id;

function* getAllChannelMembers() {
  try {
    const currentChannelId = yield select(getCurrentChannelId);
    const {
      data: { members },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/channels/${currentChannelId}`,
    });

    // dispatch action
    yield put(receivedChannelMembers(members));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getChannelMembers saga error: ', e);
    // dispatch an error
    yield put(receivedChannelMembersError(e.message));
  }
}

export default getAllChannelMembers;
