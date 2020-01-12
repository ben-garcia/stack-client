import React from 'react';

import { ChannelProps } from './types';
import './styles.scss';

const Channel: React.FC<ChannelProps> = ({ className }) => {
  let classesToAdd: string = 'channel';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="channel__name">#general</div>
      <div className="channel__inner">
        <div className="channel__member-count">members: 0 |</div>
        <div className="channel__description">
          Company-wide announcements and work-based matters
        </div>
      </div>
    </section>
  );
};

export default Channel;
