import { SyntheticEvent } from 'react';

export interface ButtonProps {
  style?: React.CSSProperties;
  text: string;
  onClick: (e: SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
  className?: string;
}
