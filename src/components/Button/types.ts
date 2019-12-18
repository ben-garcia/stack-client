import { SyntheticEvent } from 'react';

import { IconProps } from '../Icon/types';

export interface ButtonProps {
  type: 'button' | 'submit';
  text?: string;
  onClick?: (e: SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
  className?: string;
  iconType?: IconProps['type'];
}
