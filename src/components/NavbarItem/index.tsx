import React from 'react';

import './styles.scss';
import { NavbarItemProps } from './types';

const NavbarItem: React.FC<NavbarItemProps> = ({ style = {}, children }) => {
  return (
    <li style={style} className="navigation__item">
      {children}
    </li>
  );
};

export default NavbarItem;
