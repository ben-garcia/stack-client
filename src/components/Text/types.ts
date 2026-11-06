import React from 'react';

export interface TextProps {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  modalId?: string;
  size?: 'xm' | 'sm' | 'md' | 'lg' | 'xlg';
  tag?: 'p' | 'span' | 'div';
}
