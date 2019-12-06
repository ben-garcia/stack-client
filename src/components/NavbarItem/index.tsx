import React from 'react';

import './styles.scss';
import { NavbarItemProps } from './types';

const NavbarItem: React.FC<NavbarItemProps> = ({ children }) => {
  return <li className="navigation__item">{children}</li>;
};

export default NavbarItem;
