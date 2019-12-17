import React from 'react';

import { ImageProps } from './types';
import './styles.scss';

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="image" />;
};

export default Image;
