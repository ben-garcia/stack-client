import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ChannelInfo, Icon, TeammateInfo, Text } from 'components';
import { AppState } from 'store';
import { openChannelDetails } from 'store/channelDetails';
import { openMobileSidebar } from 'store/mobileSidebar';
import { WorkspaceInfoProps } from './types';
import './styles.scss';

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const {
    channelDetails,
    currentChannel,
    currentTeammate,
    viewport,
  } = useSelector((state: AppState) => ({
    channelDetails: state.channelDetails,
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    viewport: state.viewport,
  }));
  let classesToAdd: string = 'workspace-info';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      {(viewport.isPhone || viewport.isTablet) && (
        <Button
          className="hamburger-button"
          color="transparent"
          onClick={() => dispatch(openMobileSidebar())}
          type="button"
        >
          <Icon color="black" size="sm" type="hamburger-menu" />
        </Button>
      )}
      {currentChannel.id && !currentTeammate.id ? (
        <ChannelInfo
          channel={currentChannel as any}
          className="workspace-info__inner-right"
        />
      ) : null}
      {currentTeammate.id && !currentChannel.id ? (
        <TeammateInfo
          currentTeammate={currentTeammate as any}
          className="workspace-info__inner-right"
        />
      ) : null}
      {currentChannel.id && !currentTeammate.id && !channelDetails.isOpen ? (
        <div className="container">
          <Button
            className="details-button"
            color="transparent"
            onClick={() => dispatch(openChannelDetails())}
            title="Show channel details"
            type="button"
          >
            <Icon className="details-button__icon" type="info" size="sm" />
            <Text className="details-button__text" tag="span" size="sm">
              Details
            </Text>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default WorkspaceInfo;
