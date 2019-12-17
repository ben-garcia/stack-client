import React from 'react';

import NavbarItem from './NavbarItem';
import { NavbarComponent } from './types';
import './styles.scss';

/**
 * Navbar is a navigation.
 * @see NavbarItem
 */
const Navbar: NavbarComponent = ({
  className = '',
  direction = 'row',
  children,
}) => {
  let directionToRender: string = 'row';

  if (direction === 'column') {
    directionToRender = 'column';
  }

  return (
    <nav className={`navigation navigation--${directionToRender} ${className}`}>
      <ul className="navigation__inner">{children}</ul>
    </nav>
  );
};

Navbar.Item = NavbarItem;

export default Navbar;
