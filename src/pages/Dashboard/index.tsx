import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  ChannelView,
  WorkspaceInfo,
  WorkspaceList,
  WorkspaceSidebar,
} from 'components';
import { AppState } from 'store';
import { getCurrentChannel, updateChannelTopic } from 'store/channel';
import { Channel, requestWorkspaceChannels } from 'store/channels';
import { requestChannelMembers } from 'store/members';
import { getCurrentTeammateId } from 'store/teammate';
import { requestWorkspaceTeammates } from 'store/teammates/actions';
import { userLoggedIn } from 'store/user';
import { getCurrentWorkspaceId } from 'store/workspace';
import { requestUserWorkspaces } from 'store/workspaces/actions';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = () => {
  const {
    currentChannel,
    currentTeammateId,
    currentWorkspaceId,
    channels,
    teammates,
    user,
    workspaces,
  } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    currentTeammateId: state.currentTeammateId,
    currentWorkspaceId: state.currentWorkspaceId,
    channels: state.channels,
    teammates: state.teammates,
    user: state.user,
    workspaces: state.workspaces,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  // set up redux store via localStorage on page reload
  if (!user.isLoggedIn) {
    const userFromLocalStorage = localStorage.getItem('user');
    const teammateIdFromLocalStorage = localStorage.getItem(
      'currentTeammateId'
    );
    const workspaceIdFromLocalStorage = localStorage.getItem(
      'currentWorkspaceId'
    );
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
    if (teammateIdFromLocalStorage) {
      dispatch(getCurrentTeammateId(Number(teammateIdFromLocalStorage)));
    }
    // set up workspaceId on page reload
    if (workspaceIdFromLocalStorage) {
      const workspaceId = Number(workspaceIdFromLocalStorage);
      // dispatch action to update store
      dispatch(getCurrentWorkspaceId(workspaceId));
      // ONLY when the store has been updated with the current workspace id
      // dispatch action to get all current workspace's channels
      dispatch(requestWorkspaceChannels());
      // ONLY when the store has been pudated with the curent workspace id
      // dispatch action to get all current workpace's teammates
      dispatch(requestWorkspaceTeammates());
    }
    // set up channelId on page reload
    if (channelFromLocalStorage) {
      const channel = JSON.parse(channelFromLocalStorage);
      // dispatch action to update store
      dispatch(getCurrentChannel(channel));
      // dispatch action to update the current channel's topic
      dispatch(updateChannelTopic(channel.topic));
      // dispatch action to get the current channel's members
      dispatch(requestChannelMembers());
    }
  }

  // get the name of the current workspace
  let workspaceName: string | undefined = 'Loading';
  workspaceName = workspaces.list.find(w => w.id === currentWorkspaceId)?.name;

  // get the current channel
  const channel: Channel | undefined = channels.list.find(
    c => c.id === currentChannel.id
  );

  // get the current teammate
  const currentTeammate = teammates.list.find(m => m.id === currentTeammateId);

  return (
    <div className="dashboard">
      <WorkspaceList
        workspaces={workspaces.list}
        className="dashboard__workspaces-list"
      />
      <WorkspaceInfo
        channel={channel}
        className="dashboard__top-nav"
        teammate={currentTeammate}
        username={user.username}
        workspaceName={workspaceName}
      />
      <WorkspaceSidebar className="dashboard__sidebar" />
      <ChannelView className="dashboard__main" />
    </div>
  );
};

export default Dashboard;
