import React from 'react';

export interface ListItemProps {
  active?: boolean;
  ariaLabel?: string;
  ariaSelected?: boolean;
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // don't include hover state
  role?: string;
}
