import React from 'react';

import { Icon, Text } from 'components';
import { ChannelProps } from './types';
import './styles.scss';

const Channel: React.FC<ChannelProps> = ({ channel, className = '' }) => {
  let classesToAdd: string = 'channel';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="channel__name">
        <Icon
          type={channel?.private ? 'lock' : 'hash'}
          color="black"
          size="xm"
          className="channel__icon-sm"
        />
        <Text tag="div" size="md">
          {channel?.name}
        </Text>
      </div>
      <div className="channel__inner">
        <div className="channel__member-count">
          <Icon
            type="user"
            color="black"
            size="xm"
            className="channel__icon-user"
          />
        </div>
        {channel?.topic !== null ? (
          <Icon type="pencil" size="xm" className="channel__icon-pencil" />
        ) : (
          <Text tag="div" className="channel__topic" size="md">
            {channel?.topic}
          </Text>
        )}
      </div>
    </section>
  );
};

export default Channel;
