import React from 'react';

import './styles.scss';
import { ParagraphProps } from './types';

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return <p className="paragraph">{children}</p>;
};

export default Paragraph;
