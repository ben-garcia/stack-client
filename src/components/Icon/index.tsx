import React from 'react';

import { IconProps } from './types';
import './styles.scss';

const Icon: React.FC<IconProps> = ({ type, color }) => {
  let classesToAdd: string = `icon icon--${type}`;

  if (color?.trim() === 'white' || color?.trim() === 'black') {
    classesToAdd += ` icon--${color}`;
  }

  return <i className={classesToAdd} />;
};

export default Icon;
