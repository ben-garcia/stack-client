import { combineReducers } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import channelReducer from './channel/reducer';
import getAllCurrentWorkspaceChannels from './channels/sagas';
import { REQUEST_WORKSPACE_CHANNELS } from './channels/types';
import channelsReducer from './channels/reducer';
import getAllCurrentChannelMembers from './members/sagas';
import { REQUEST_CHANNEL_MEMBERS } from './members/types';
import membersReducer from './members/reducer';
import teammateReducer from './teammate/reducer';
import teammatesReducer from './teammates/reducer';
import getAllCurrentWorkspaceTeammates from './teammates/sagas';
import { REQUEST_WORKSPACE_TEAMMATES } from './teammates/types';
import userReducer from './user/reducer';
import workspaceReducer from './workspace/reducer';
import workspacesReducer from './workspaces/reducer';
import { REQUEST_USER_WORKSPACES } from './workspaces/types';
import getAllUserWorkspaces from './workspaces/sagas';

export const rootReducer = combineReducers({
  currentChannel: channelReducer,
  currentTeammateId: teammateReducer,
  currentWorkspaceId: workspaceReducer,
  channels: channelsReducer,
  members: membersReducer,
  teammates: teammatesReducer,
  user: userReducer,
  workspaces: workspacesReducer,
});

export function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(REQUEST_CHANNEL_MEMBERS, getAllCurrentChannelMembers);
  yield takeLatest(
    REQUEST_WORKSPACE_TEAMMATES,
    getAllCurrentWorkspaceTeammates
  );
  yield takeLatest(REQUEST_USER_WORKSPACES, getAllUserWorkspaces);
  yield takeLatest(REQUEST_WORKSPACE_CHANNELS, getAllCurrentWorkspaceChannels);
}

export type AppState = ReturnType<typeof rootReducer>;
