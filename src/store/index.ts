import { combineReducers } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import { addPeopleModalReducer } from './addPeopleModal';
import { channelReducer } from './channel';
import {
  ChannelsActions,
  channelsReducer,
  getAllWorkspaceChannels,
} from './channels';
import { channelDetailsReducer } from './channelDetails';
import {
  directMessagesReducer,
  DirectMessagesActions,
  getUserDirectMessages,
} from './directMessages';

import { editChannelDescriptionModalReducer } from './editChannelDescriptionModal';
import { editChannelTopicModalReducer } from './editChannelTopicModal';
import { invitePeopleModalReducer } from './invitePeopleModal';
import {
  MembersActions,
  membersReducer,
  getAllCurrentChannelMembers,
} from './members';
import {
  messagesReducer,
  MessagesActions,
  getAllChannelMessages,
} from './messages';
import { mobileSidebarReducer } from './mobileSidebar';
import { teammateReducer } from './teammate';
import {
  getAllCurrentWorkspaceTeammates,
  TeammatesActions,
  teammatesReducer,
} from './teammates';
import { userReducer } from './user';
import { viewportReducer } from './viewport';
import { workspaceReducer } from './workspace';
import {
  getUserWorkspaces,
  WorkspacesActions,
  workspacesReducer,
} from './workspaces';

export const rootReducer = combineReducers({
  addPeopleModalIsOpen: addPeopleModalReducer,
  currentChannel: channelReducer,
  currentTeammate: teammateReducer,
  currentWorkspace: workspaceReducer,
  channels: channelsReducer,
  channelDetails: channelDetailsReducer,
  directMessages: directMessagesReducer,
  editChannelDescriptionModalIsOpen: editChannelDescriptionModalReducer,
  editChannelTopicModalIsOpen: editChannelTopicModalReducer,
  invitePeopleModalIsOpen: invitePeopleModalReducer,
  members: membersReducer,
  messages: messagesReducer,
  mobileSidebarIsOpen: mobileSidebarReducer,
  teammates: teammatesReducer,
  user: userReducer,
  viewport: viewportReducer,
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
    ChannelsActions.REQUEST_WORKSPACE_CHANNELS,
    getAllWorkspaceChannels
  );

  yield takeLatest(
    MessagesActions.REQUEST_CHANNEL_MESSAGES,
    getAllChannelMessages
  );

  yield takeLatest(
    DirectMessagesActions.REQUEST_USER_DIRECT_MESSAGES,
    getUserDirectMessages
  );

  yield takeLatest(
    TeammatesActions.REQUEST_WORKSPACE_TEAMMATES,
    getAllCurrentWorkspaceTeammates
  );

  yield takeLatest(
    WorkspacesActions.REQUEST_USER_WORKSPACES,
    getUserWorkspaces
  );
}

export type AppState = ReturnType<typeof rootReducer>;
