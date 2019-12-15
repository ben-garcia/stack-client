import NavbarItem from './NavbarItem';

export interface NavbarProps {
  className?: string;
  style?: React.CSSProperties;
  direction?: string;
  children: JSX.Element[] | JSX.Element;
}

/** Structure that describes the components of a Navbar */
export interface NavbarComponent extends React.FC<NavbarProps> {
  Item: typeof NavbarItem;
}
