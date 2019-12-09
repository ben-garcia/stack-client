import React from 'react';

import './styles.scss';
import { ParagraphProps } from './types';

const Paragraph: React.FC<ParagraphProps> = ({ style = {}, children }) => {
  return (
    <p className="paragraph" style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
