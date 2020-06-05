import React from 'react';

import { IconProps } from './types';
import './styles.scss';

const Icon: React.FC<IconProps> = ({
  color = 'black',
  className = '',
  isLoading = false,
  size = 'md',
  type,
}) => {
  let classesToAdd: string = `icon icon--${type}`;

  // determine the color to apply
  if (color !== 'black') {
    classesToAdd += ` icon--${color}`;
  } else {
    classesToAdd += ' icon--black';
  }

  // determine the size
  if (size !== 'md') {
    classesToAdd += ` icon--${size}`;
  } else {
    classesToAdd += ' icon--md';
  }

  // add className passed in if any
  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // Icon should animate
  if (isLoading) {
    classesToAdd += ' icon--loading';
  }

  return <i className={classesToAdd} />;
};

export default Icon;
