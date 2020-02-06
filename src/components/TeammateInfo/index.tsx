import React from 'react';

import { Icon, Text } from 'components';
import { TeammateInfoProps } from './types';
import './styles.scss';

const TeammateInfo: React.FC<TeammateInfoProps> = ({
  teammate,
  className = '',
}) => {
  let classesToAdd: string = 'teammate';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <Text tag="div" size="md" className="teammate__name">
        {teammate?.username}
      </Text>
      <Icon
        type="circle"
        color="green"
        size="xm"
        className="teammate__circle-icon"
      />
    </section>
  );
};

export default TeammateInfo;
