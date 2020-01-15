import React from 'react';

import { Button, Icon } from 'components';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({ className = '' }) => {
  let classesToAdd: string = 'channel-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="channel-list__inner">
        <span className="channel-list__heading">Channels</span>
        <Button
          className="channel-list__add-button"
          type="button"
          color="transparent"
        >
          <Icon type="plus" color="white" />
        </Button>
      </div>
    </section>
  );
};

export default ChannelList;
