import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

import {
  Button,
  ViewWrapper,
  Icon,
  Placeholder,
  WorkspaceList,
  WorkspaceSidebar,
} from 'components';
import useMediaQuery from 'hooks';
import { AppState } from 'store';
import { getCurrentChannel, updateChannelTopic } from 'store/channel';
import { requestWorkspaceChannels } from 'store/channels';
import { requestUserDirectMessages } from 'store/directMessages';
import { requestChannelMembers } from 'store/members';
import { requestChannelMessages } from 'store/messages';
import { closeMobileSidebar } from 'store/mobileSidebar';
import { getCurrentTeammate } from 'store/teammate';
import { requestWorkspaceTeammates } from 'store/teammates';
import { userLoggedIn } from 'store/user';
import {
  viewportIsPhone,
  viewportIsTablet,
  viewportIsDesktop,
} from 'store/viewport';
import { getCurrentWorkspace } from 'store/workspace';
import { requestUserWorkspaces } from 'store/workspaces';
import { DashboardProps } from './types';
import './styles.scss';

const Dashboard: React.FC<DashboardProps> = () => {
  const store = useStore();
  const isPhone = useMediaQuery('(min-width: 0) and (max-width: 576px)');
  const isTablet = useMediaQuery('(min-width: 576px) and (max-width: 998px)');
  const isDesktop = useMediaQuery('(min-width: 998px)');
  const {
    currentChannel,
    currentTeammate,
    mobileSidebarIsOpen,
    user,
    workspaces,
  } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    channels: state.channels,
    mobileSidebarIsOpen: state.mobileSidebarIsOpen,
    user: state.user,
    workspaces: state.workspaces,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isPhone) {
      dispatch(viewportIsPhone());
    } else if (isTablet) {
      dispatch(viewportIsTablet());
    } else if (isDesktop) {
      dispatch(viewportIsDesktop());
      dispatch(closeMobileSidebar());
    }
    // eslint-disable-next-line
  }, [isPhone, isTablet, isDesktop]);

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
      <div
        className={
          mobileSidebarIsOpen
            ? 'dashboard__inner dashboard__inner--mobile'
            : 'dashboard__inner'
        }
      >
        {workspaces.list.length > 0 && !workspaces.isLoading ? (
          <WorkspaceList
            className="dashboard__workspace-list"
            workspaces={workspaces.list}
          />
        ) : (
          <div>
            <Placeholder color="light" numberOfTags={5} type="info" />
          </div>
        )}
        <WorkspaceSidebar className="dashboard__sidebar" />
        {isPhone || isTablet ? (
          <Button
            className="mobile-close-button"
            color="transparent"
            onClick={() => dispatch(closeMobileSidebar())}
            type="button"
          >
            <Icon color="white" size="sm" type="times" />
          </Button>
        ) : null}
      </div>
      <ViewWrapper className="dashboard__main" />
    </div>
  );
};

export default Dashboard;
