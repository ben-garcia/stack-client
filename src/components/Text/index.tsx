import React from 'react';

import { TextProps } from './types';
import './styles.scss';

const Text: React.FC<TextProps> = ({
  children,
  className = '',
  modalId = undefined,
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
  let elementToRender = (
    <p id={modalId} className={classesToAdd}>
      {children}
    </p>
  );

  if (tag === 'span') {
    elementToRender = (
      <span id={modalId} className={classesToAdd}>
        {children}
      </span>
    );
  } else if (tag === 'div') {
    elementToRender = (
      <div id={modalId} className={classesToAdd}>
        {children}
      </div>
    );
  }

  return elementToRender;
};

export default Text;
