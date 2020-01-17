import React from 'react';

import { TextProps } from './types';
import './styles.scss';

const Text: React.FC<TextProps> = ({
  children,
  className = '',
  tag = 'p',
  size = 'md',
}) => {
  let classesToAdd: string = 'text';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  if (size !== 'md') {
    classesToAdd += ` text--${size}`;
  } else {
    classesToAdd += ' text--md';
  }

  // p tag is rendered by default
  let elementToRender: JSX.Element = <p className={classesToAdd}>{children}</p>;

  if (tag === 'span') {
    elementToRender = <span className={classesToAdd}>{children}</span>;
  } else if (tag === 'div') {
    elementToRender = <div className={classesToAdd}>{children}</div>;
  }

  return elementToRender;
};

export default Text;
