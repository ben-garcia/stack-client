import React from 'react';

import { Icon } from '..';
import { ButtonProps } from './types';
import './styles.scss';

const Button: React.FC<ButtonProps> = ({
  style = {},
  text = '',
  color = 'primary',
  onClick,
  className = '',
  iconType = '',
}) => {
  let backgroundColor: string = 'primary';
  let iconToRender: React.ReactNode;

  // color prop should either be 'primary' | 'transparent'
  if (color === 'transparent') {
    backgroundColor = 'transparent';
  }

  // when icon is to be used with no text.
  if (!text && iconType) {
    iconToRender = <Icon type={iconType} />;
  }

  return (
    <button
      style={style}
      type="button"
      className={`button button--${backgroundColor} ${className}`}
      onClick={onClick}
    >
      {!text && iconType ? iconToRender : ''}
      {text && !iconType ? text : ''}
    </button>
  );
};

export default Button;
