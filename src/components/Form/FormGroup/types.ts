import { ReactNode } from 'react';

export interface FormGroupProps {
  children: ReactNode[] | ReactNode;
  className?: string;
  flexDirection?: 'row' | 'column';
}
