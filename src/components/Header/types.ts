import { ReactNode } from 'react';

export interface HeaderProps {
  heading: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headerPosition?: 'left' | 'center' | 'right';
  children?: ReactNode;
}
