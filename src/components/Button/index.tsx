import React from 'react';

import { Icon } from '..';
import { ButtonProps } from './types';
import './styles.scss';

const Button: React.FC<ButtonProps> = ({
  type,
  text = '',
  color = 'primary',
  onClick,
  className = '',
  iconType = '',
  disabled = false,
}) => {
  let iconToRender: React.ReactNode;
  let classesToAdd: string = 'button';

  // color prop should either be 'primary' | 'transparent'
  if (color === 'transparent') {
    classesToAdd += ' button--transparent';
  } else {
    classesToAdd += ' button--primary';
  }

  // when icon is to be used with no text.
  if (!text && iconType) {
    iconToRender = <Icon type={iconType} />;
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
    >
      {!text && iconType ? iconToRender : ''}
      {text && !iconType ? text : ''}
    </button>
  );
};

export default Button;
