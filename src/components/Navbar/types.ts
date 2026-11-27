import { FC, ReactNode } from 'react';

import NavbarItem from './NavbarItem';

export interface NavbarProps {
  className?: string;
  direction?: string;
  children: ReactNode[] | ReactNode;
}

/** Structure that describes the components of a Navbar */
export interface NavbarComponent extends FC<NavbarProps> {
  Item: typeof NavbarItem;
}
