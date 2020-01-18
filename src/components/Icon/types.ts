type IconType =
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'lock'
  | 'pencil'
  | 'plus'
  | 'times'
  | 'user';

export interface IconProps {
  type: IconType;
  size?: 'xm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxl';
  color?: 'white' | 'black';
}
