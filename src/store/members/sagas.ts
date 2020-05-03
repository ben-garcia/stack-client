import { call, put, select } from 'redux-saga/effects';

import { sendRequest } from 'api';
import { AppState } from 'store';
import { receivedChannelMembers, receivedChannelMembersError } from './actions';

// selector to get the current channel id
const getCurrentChannelId = (state: AppState) => state.currentChannel.id;
const getCurrentTeammates = (state: AppState) => state.teammates.list;

function* getAllChannelMembers() {
  try {
    const currentChannelId = yield select(getCurrentChannelId);
    const currentTeammates = yield select(getCurrentTeammates);
    const {
      data: { members },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/channels/${currentChannelId}`,
    });

    // get the members colors using current teammates
    for (let i = 0; i < currentTeammates.length; i += 1) {
      for (let j = 0; j < members.length; j += 1) {
        if (members[j].username === currentTeammates[i].username) {
          members[j].color = currentTeammates[i].color;
        }
      }
    }

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
