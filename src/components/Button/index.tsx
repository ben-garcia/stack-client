import React from 'react';

import { ButtonProps } from './types';
import './styles.scss';

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  color = 'primary',
  onClick,
  className = '',
  disabled = false,
  title = '',
}) => {
  let classesToAdd: string = 'button';

  // color prop should either be 'primary' | 'transparent'
  if (color === 'transparent') {
    classesToAdd += ' button--transparent';
  } else {
    classesToAdd += ' button--primary';
  }

  // make sure onClick prop is a function
  if (onClick && typeof onClick !== 'function') {
    throw new TypeError(
      `onClick prop must be a function. You passed in a ${typeof onClick}`
    );
  }

  // className to add
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // determine if the button should be disabled
  if (disabled) {
    classesToAdd += ' button--disabled';
  }

  return (
    <button
      type={type}
      className={classesToAdd}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
