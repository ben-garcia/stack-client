import React from 'react';

import {
  Button,
  ChannelInfo,
  Icon,
  TeammateInfo,
  Text,
  Workspace,
} from 'components';
import { WorkspaceInfoProps } from './types';
import './styles.scss';

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({
  channel,
  className = '',
  teammate,
  username,
  workspaceName,
}) => {
  let classesToAdd: string = 'workspace-info';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      <Workspace
        workspaceName={workspaceName}
        username={username}
        className="workspace-info__inner-left"
      />
      {channel && !teammate && (
        <ChannelInfo
          channel={channel}
          className="workspace-info__inner-right"
        />
      )}
      {teammate && !channel && (
        <TeammateInfo
          teammate={teammate}
          className="workspace-info__inner-right"
        />
      )}
      {channel && !teammate && (
        <div className="container">
          <Button
            className="details-button"
            type="button"
            color="transparent"
            title="Show channel details"
          >
            <Icon className="details-button__icon" type="circle" size="sm" />
            <Text className="details-button__text" tag="span" size="sm">
              Details
            </Text>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkspaceInfo;
