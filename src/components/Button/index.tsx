import React from 'react';

import './styles.scss';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  style = {},
  text,
  color = 'primary',
  onClick,
  className = '',
}) => {
  let backgroundColor: string = 'primary';

  // color prop should either be 'primary' | 'transparent'
  if (color === 'transparent') {
    backgroundColor = 'transparent';
  }

  return (
    <button
      style={style}
      type="button"
      className={`button button--${backgroundColor} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
