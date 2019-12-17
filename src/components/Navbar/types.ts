import NavbarItem from './NavbarItem';

export interface NavbarProps {
  className?: string;
  direction?: string;
  children: React.ReactNode[] | React.ReactNode;
}

/** Structure that describes the components of a Navbar */
export interface NavbarComponent extends React.FC<NavbarProps> {
  Item: typeof NavbarItem;
}
