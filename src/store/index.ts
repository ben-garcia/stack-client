import { combineReducers } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import { channelReducer } from './channel';
import {
  ChannelsActions,
  channelsReducer,
  getAllWorkspaceChannels,
} from './channels';
import { invitePeopleModalReducer } from './invitePeopleModal';
import {
  MembersActions,
  membersReducer,
  getAllCurrentChannelMembers,
} from './members';
import { teammateReducer } from './teammate';
import {
  getAllCurrentWorkspaceTeammates,
  TeammatesActions,
  teammatesReducer,
} from './teammates';
import { userReducer } from './user';
import { workspaceReducer } from './workspace';
import workspacesReducer from './workspaces/reducer';
import { REQUEST_USER_WORKSPACES } from './workspaces/types';
import getAllUserWorkspaces from './workspaces/sagas';

export const rootReducer = combineReducers({
  currentChannel: channelReducer,
  currentTeammateId: teammateReducer,
  currentWorkspaceId: workspaceReducer,
  channels: channelsReducer,
  invitePeopleModalIsOpen: invitePeopleModalReducer,
  members: membersReducer,
  teammates: teammatesReducer,
  user: userReducer,
  workspaces: workspacesReducer,
});

export function* rootSaga() {
  // takeLatest effect takes the latest action dispatched
  // if two actions are fired one after another, the last action will fire
  // while the first is canceled
  yield takeLatest(
    MembersActions.REQUEST_CHANNEL_MEMBERS,
    getAllCurrentChannelMembers
  );
  yield takeLatest(
    TeammatesActions.REQUEST_WORKSPACE_TEAMMATES,
    getAllCurrentWorkspaceTeammates
  );
  yield takeLatest(REQUEST_USER_WORKSPACES, getAllUserWorkspaces);
  yield takeLatest(
    ChannelsActions.REQUEST_WORKSPACE_CHANNELS,
    getAllWorkspaceChannels
  );
}

export type AppState = ReturnType<typeof rootReducer>;
