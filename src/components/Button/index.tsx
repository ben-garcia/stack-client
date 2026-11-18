import React, { forwardRef } from 'react';

import { ButtonProps } from './types';
import './styles.scss';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      ariaControls = undefined,
      ariaCurrent = undefined,
      ariaExpanded = undefined,
      ariaDescribedBy = undefined,
      ariaLabel = undefined,
      ariaSelected = undefined,
      children,
      className = '',
      color = 'primary',
      customAttribute = {},
      disabled = false,
      onClick = undefined,
      onFocus = undefined,
      onBlur = undefined,
      onKeyDown = undefined,
      id = undefined,
      role = undefined,
      tabIndex = undefined,
      title = undefined,
      type = undefined,
    },
    ref
  ) => {
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
      className: classesToAdd,
      disabled,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      id,
      role,
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
      // eslint-disable-next-line jsx-a11y/role-supports-aria-props
      <button
        {...props}
        aria-controls={ariaControls}
        aria-current={ariaCurrent}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-selected={ariaSelected}
        aria-label={ariaLabel}
        ref={ref}
        tabIndex={tabIndex}
        type={type}
      >
        {children}
      </button>
    );
  }
);

export default Button;
