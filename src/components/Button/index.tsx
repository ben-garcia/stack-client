import React from 'react';

import { ButtonProps } from './types';
import './styles.scss';

const Button: React.FC<ButtonProps> = ({
  ariaControls = undefined,
  ariaExpanded = undefined,
  ariaLabel = undefined,
  ariaCurrent = undefined,
  type,
  children,
  color = 'primary',
  onClick = undefined,
  onFocus = undefined,
  onBlur = undefined,
  className = '',
  disabled = false,
  title = undefined,
  customAttribute = {},
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

  // props to pass along
  const props: any = {
    type,
    className: classesToAdd,
    onClick,
    onBlur,
    onFocus,
    disabled,
    title,
  };

  // make sure the onClick function is not called when
  // the button is disabled
  if (disabled) {
    delete props.onClick;
  }

  // Add custom data.
  if (Object.keys(customAttribute).length !== 0) {
    const [key] = Object.keys(customAttribute);
    const [value] = Object.values(customAttribute);
    props[`data-${key?.toLowerCase()}`] = value;
  }

  return (
    <button
      {...props}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
