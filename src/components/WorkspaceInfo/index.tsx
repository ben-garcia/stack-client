import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ChannelInfo, Icon, TeammateInfo, Text } from 'components';
import { AppState } from 'store';
import { openChannelDetails } from 'store/channelDetails';
import { WorkspaceInfoProps } from './types';
import './styles.scss';

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { channelDetailsIsOpen, currentChannel, currentTeammate } = useSelector(
    (state: AppState) => ({
      channelDetailsIsOpen: state.channelDetailsIsOpen,
      currentChannel: state.currentChannel,
      currentTeammate: state.currentTeammate,
    })
  );
  let classesToAdd: string = 'workspace-info';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      {currentChannel.id && !currentTeammate.id ? (
        <ChannelInfo
          channel={currentChannel as any}
          className="workspace-info__inner-right"
        />
      ) : null}
      {currentTeammate.id && !currentChannel.id ? (
        <TeammateInfo
          teammate={currentTeammate as any}
          className="workspace-info__inner-right"
        />
      ) : null}
      {currentChannel.id && !currentTeammate.id && !channelDetailsIsOpen ? (
        <div className="container">
          <Button
            className="details-button"
            color="transparent"
            onClick={() => dispatch(openChannelDetails())}
            title="Show channel details"
            type="button"
          >
            <Icon className="details-button__icon" type="circle" size="sm" />
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
