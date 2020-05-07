import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

import {
  ChannelView,
  Placeholder,
  WorkspaceList,
  WorkspaceSidebar,
} from 'components';
import { AppState } from 'store';
import { getCurrentChannel, updateChannelTopic } from 'store/channel';
import { requestWorkspaceChannels } from 'store/channels';
import { requestChannelMembers } from 'store/members';
import { requestUserDirectMessages } from 'store/directMessages';
import { requestChannelMessages } from 'store/messages';
import { getCurrentTeammate } from 'store/teammate';
import { requestWorkspaceTeammates } from 'store/teammates';
import { userLoggedIn } from 'store/user';
import { getCurrentWorkspace } from 'store/workspace';
import { requestUserWorkspaces } from 'store/workspaces';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = () => {
  const store = useStore();
  const { currentChannel, currentTeammate, user, workspaces } = useSelector(
    (state: AppState) => ({
      currentChannel: state.currentChannel,
      currentTeammate: state.currentTeammate,
      currentWorkspace: state.currentWorkspace,
      channels: state.channels,
      user: state.user,
      workspaces: state.workspaces,
    })
  );
  const dispatch = useDispatch();
  const history = useHistory();
  // set up redux store via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
    const teammateFromLocalStorage = localStorage.getItem('currentTeammate');
    const workspaceFromLocalStorage = localStorage.getItem('currentWorkspace');
    const channelFromLocalStorage = localStorage.getItem('currentChannel');
    // if a user is stored in localStorage
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage!);
      // dispatch action to updated user in the store
      dispatch(userLoggedIn(parsedUser));
      // dispatch action to get all user's workspaces
      dispatch(requestUserWorkspaces());
    } else {
      // if there is no user item in local storage then
      // it means the user isn't logged in so
      // redirect to the landing page
      history.replace('/');
    }
    // set up current teammate id on page reload
    if (teammateFromLocalStorage && !currentChannel.id) {
      dispatch(getCurrentTeammate(JSON.parse(teammateFromLocalStorage)));
    }
    // set up workspace on page reload
    if (workspaceFromLocalStorage) {
      const workspace = JSON.parse(workspaceFromLocalStorage);
      // dispatch action to update store
      dispatch(getCurrentWorkspace(workspace));
      // ONLY when the store has been updated with the current workspace id
      // dispatch action to get all current workspace's channels
      dispatch(requestWorkspaceChannels());
      // ONLY when the store has been pudated with the curent workspace id
      // dispatch action to get all current workpace's teammates
      dispatch(requestWorkspaceTeammates());
    }
    // make sure the current workspace id is stored in local storage
    if (teammateFromLocalStorage && workspaceFromLocalStorage) {
      // const interval = setInterval(() => {
      // const { directMessages } = store.getState();
      // if (directMessages.length > 0) {
      dispatch(requestUserDirectMessages());
      // clearInterval(interval);
      // }
      // }, 100);
    }
    // set up channelId on page reload
    if (channelFromLocalStorage && !currentTeammate.id) {
      const channel = JSON.parse(channelFromLocalStorage);
      // dispatch action to update store
      dispatch(getCurrentChannel(channel));
      // dispatch action to update the current channel's topic
      dispatch(updateChannelTopic(channel.topic));
      // make sure that workspace teammates have been received
      const interval = setInterval(() => {
        const { teammates } = store.getState();
        if (teammates.list.length > 0) {
          // dispatch action to get the current channel's members
          dispatch(requestChannelMembers());
          // dispatch action to get the current channel's messages
          dispatch(requestChannelMessages());
          clearInterval(interval);
        }
      }, 100);
    }
  }

  return (
    <div className="dashboard">
      {workspaces.list.length > 0 && !workspaces.isLoading ? (
        <WorkspaceList
          workspaces={workspaces.list}
          className="dashboard__workspaces-list"
        />
      ) : (
        <div className="dashboard__workspaces-list">
          <Placeholder color="light" numberOfTags={5} type="info" />
        </div>
      )}
      <WorkspaceSidebar className="dashboard__sidebar" />
      <ChannelView className="dashboard__main" />
    </div>
  );
};

export default Dashboard;
