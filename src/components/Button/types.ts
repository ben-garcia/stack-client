import { SyntheticEvent } from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit';
  onClick?: (e: SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
  className?: string;
  disabled?: boolean;
}
