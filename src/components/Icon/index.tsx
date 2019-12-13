import React from 'react';

import { IconProps } from './types';
import './styles.scss';

const Icon: React.FC<IconProps> = ({ type }) => {
  return <i className={`icon icon--${type}`} />;
};

export default Icon;
