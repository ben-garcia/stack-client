import React from 'react';

import { TextProps } from './types';
import './styles.scss';

const Text: React.FC<TextProps> = ({
  ariaLabel = undefined,
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
  let elementToRender;

  if (tag === 'span') {
    elementToRender = (
      <span aria-label={ariaLabel} id={modalId} className={classesToAdd}>
        {children}
      </span>
    );
  } else if (tag === 'div') {
    elementToRender = (
      <div aria-label={ariaLabel} id={modalId} className={classesToAdd}>
        {children}
      </div>
    );
  } else {
    elementToRender = (
      <p aria-label={ariaLabel} id={modalId} className={classesToAdd}>
        {children}
      </p>
    );
  }

  return elementToRender;
};

export default Text;
