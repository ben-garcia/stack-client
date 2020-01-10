import { combineReducers } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import userReducer from './user/reducer';
import workspacesReducer from './workspaces/reducer';
import { REQUEST_USER_WORKSPACES } from './workspaces/types';
import getAllUserWorkspaces from './workspaces/sagas';

export const rootReducer = combineReducers({
  user: userReducer,
  workspaces: workspacesReducer,
});

export function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(REQUEST_USER_WORKSPACES, getAllUserWorkspaces);
}

export type AppState = ReturnType<typeof rootReducer>;
