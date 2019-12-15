import { SyntheticEvent } from 'react';

import { IconProps } from '../Icon/types';

export interface ButtonProps {
  style?: React.CSSProperties;
  text?: string;
  onClick: (e: SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
  className?: string;
  iconType?: IconProps['type'];
}
