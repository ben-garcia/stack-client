import { call, put, select } from 'redux-saga/effects';

import { sendRequest } from 'api';
import { AppState } from 'store';
import {
  receivedWorkspaceChannels,
  receivedWorkspaceChannelsError,
} from './actions';

// selector to get current workspace id
const getCurrentWorkspaceId = (state: AppState) => state.currentWorkspace.id;
const getCurrentUserId = (state: AppState) => state.user.id;

function* getAllCurrentWorkspaceChannels() {
  try {
    const currentWorkspaceId = yield select(getCurrentWorkspaceId);
    const currentUserId = yield select(getCurrentUserId);
    const {
      data: { channels },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/channels?userId=${currentUserId}&workspaceId=${currentWorkspaceId}`,
    });

    // dispatch the action
    yield put(receivedWorkspaceChannels(channels));
  } catch (e) {
    // eslint-disable-next-line
    console.log('getWorkspaceChannels saga Error: ', e);
    // dispatch an error
    yield put(receivedWorkspaceChannelsError(e.message));
  }
}

export default getAllCurrentWorkspaceChannels;
