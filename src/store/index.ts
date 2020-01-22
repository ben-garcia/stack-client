import { combineReducers } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import getAllCurrentWorkspaceChannels from './channels/sagas';
import { REQUEST_WORKSPACE_CHANNELS } from './channels/types';
import channelsReducer from './channels/reducer';
import userReducer from './user/reducer';
import workspaceReducer from './workspace/reducer';
import workspacesReducer from './workspaces/reducer';
import { REQUEST_USER_WORKSPACES } from './workspaces/types';
import getAllUserWorkspaces from './workspaces/sagas';

export const rootReducer = combineReducers({
  channels: channelsReducer,
  user: userReducer,
  currentWorkspaceId: workspaceReducer,
  workspaces: workspacesReducer,
});

export function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(REQUEST_USER_WORKSPACES, getAllUserWorkspaces);
  yield takeLatest(REQUEST_WORKSPACE_CHANNELS, getAllCurrentWorkspaceChannels);
}

export type AppState = ReturnType<typeof rootReducer>;
