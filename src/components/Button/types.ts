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
  type: 'button' | 'submit';
  onClick?: (e: React.SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
  className?: string;
  disabled?: boolean;
  title?: string;
  customAttribute?: { [key: string]: string };
}
