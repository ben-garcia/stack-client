import React from 'react';

import { ImageProps } from './types';
import './styles.scss';

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  return (
    <img src={src} alt={alt} className={`image image--${size} ${className}`} />
  );
};

export default Image;
