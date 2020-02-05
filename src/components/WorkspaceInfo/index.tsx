import React from 'react';

import { ChannelInfo, MemberInfo, Workspace } from 'components';
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
        <MemberInfo member={teammate} className="workspace-info__inner-right" />
      )}
    </div>
  );
};

export default WorkspaceInfo;
