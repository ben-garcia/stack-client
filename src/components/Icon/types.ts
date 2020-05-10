type IconTypes =
  | 'checkmark'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle'
  | 'hamburger-menu'
  | 'hash'
  | 'info'
  | 'lock'
  | 'pencil'
  | 'plus'
  | 'times'
  | 'user';

export type colorTypes =
  | 'aquamarine'
  | 'black'
  | 'blue'
  | 'dim-grey'
  | 'golden'
  | 'green'
  | 'green-yellow'
  | 'lawn-green'
  | 'orange'
  | 'orange-red'
  | 'purple'
  | 'red'
  | 'teal'
  | 'white'
  | 'yellow';

export interface IconProps {
  type: IconTypes;
  size?: 'xm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxl';
  color?: colorTypes;
  className?: string;
}
