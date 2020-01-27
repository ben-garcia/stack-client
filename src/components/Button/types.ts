export interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit';
  onClick?: (e: React.SyntheticEvent) => void;
  color?: 'primary' | 'transparent';
  className?: string;
  disabled?: boolean;
  title?: string;
}
