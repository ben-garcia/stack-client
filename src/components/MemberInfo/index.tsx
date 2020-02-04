import React from 'react';

import { Icon, Text } from 'components';
import { MemberInfoProps } from './types';
import './styles.scss';

const ChannelInfo: React.FC<MemberInfoProps> = ({ member, className = '' }) => {
  let classesToAdd: string = 'member';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <Text tag="div" size="md" className="member__name">
        {member?.username}
      </Text>
      <Icon
        type="circle"
        color="green"
        size="xm"
        className="member__circle-icon"
      />
    </section>
  );
};

export default ChannelInfo;
