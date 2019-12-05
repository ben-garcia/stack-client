import React from 'react';

import { ImageProps } from './types';
import './styles.scss';

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default Image;
