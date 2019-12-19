export interface HeaderProps {
  className?: string;
  heading: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textAlign?: 'left' | 'center' | 'right';
  children?: JSX.Element[] | JSX.Element;
}
