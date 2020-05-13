import { call, put, select } from 'redux-saga/effects';

import { sendRequest } from 'api';
import { AppState } from 'store';
import {
  receivedUserDirectMessages,
  receivedUserDirectMessagesError,
} from './actions';

// selector to get the current user id
const getCurrentTeammateId = (state: AppState) => state.currentTeammate.id;
const getCurrentTeammates = (state: AppState) => state.teammates.list;
const getCurrentWorkspaceId = (state: AppState) => state.currentWorkspace.id;

function* getUserDirectMessages() {
  try {
    const currentTeammates = yield select(getCurrentTeammates);
    const currentTeammateId = yield select(getCurrentTeammateId);
    const currentWorkspaceId = yield select(getCurrentWorkspaceId);
    const {
      data: { directMessages },
    } = yield call(sendRequest, {
      method: 'GET',
      url: `/direct-messages?teammateId=${currentTeammateId}&workspaceId=${currentWorkspaceId}`,
    });

    for (let i = 0; i < directMessages.length; i += 1) {
      for (let j = 0; j < currentTeammates.length; j += 1) {
        if (directMessages[i].user.username === currentTeammates[j].username) {
          directMessages[i].user.color = currentTeammates[j].color;
        }
      }
    }

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
