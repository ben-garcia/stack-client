import React from 'react';

import './styles.scss';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  text,
  color = 'primary',
  onClick,
}) => {
  let backgroundColor: string = 'primary';

  // color prop should either be 'primary' | 'transparent'
  if (color === 'transparent') {
    backgroundColor = 'transparent';
  }

  return (
    <button
      type="button"
      className={`button button--${backgroundColor}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
