import React from 'react';

import { ImageProps } from './types';
import './styles.scss';

const Image: React.FC<ImageProps> = ({ style = {}, src, alt }) => {
  return <img style={style} src={src} alt={alt} className="image" />;
};

export default Image;
