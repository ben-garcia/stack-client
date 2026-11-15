import React from 'react';

export interface ButtonProps {
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaCurrent?:
    | boolean
    | 'time'
    | 'false'
    | 'true'
    | 'page'
    | 'step'
    | 'location'
    | 'date';
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'transparent';
  customAttribute?: { [key: string]: string };
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  tabIndex?: number;
  title?: string;
  type?: 'button' | 'submit';
}
