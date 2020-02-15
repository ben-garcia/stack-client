import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { ChannelViewProps } from './types';

const ChannelView: React.FC<ChannelViewProps> = ({ className = '' }) => {
  const { channel } = useSelector((state: AppState) => ({
    channel: state.currentChannel,
  }));
  let classesToAdd: string = 'channel-view';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <main className={classesToAdd}>
      <div className="channel-view__description">{channel.topic}</div>
    </main>
  );
};

export default ChannelView;
