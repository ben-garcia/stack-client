import React from 'react';

import './styles.scss';
import { ParagraphProps } from './types';

const Paragraph: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  let classNamesToAdd: string = 'paragraph';

  if (className.trim() !== '') {
    classNamesToAdd += ` ${className}`;
  }

  return <p className={classNamesToAdd}>{children}</p>;
};

export default Paragraph;
