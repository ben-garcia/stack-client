export interface HeaderProps {
  style?: React.CSSProperties;
  heading: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: JSX.Element[] | JSX.Element;
}
