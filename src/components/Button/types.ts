import { SyntheticEvent } from 'react';

export interface ButtonProps {
  text: string;
  onClick: (e: SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
}
