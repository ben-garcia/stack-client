import React from 'react';

import './styles.scss';
import { NavbarProps } from './types';

const Navbar: React.FC<NavbarProps> = ({
  margin = '0',
  padding = '0',
  direction = 'row',
  children,
}) => {
  let directionToRender: string = 'row';

  if (direction === 'column') {
    directionToRender = 'column';
  }

  return (
    <nav
      className={`navigation navigation--${directionToRender}`}
      style={{ margin, padding }}
    >
      <ul className="navigation__inner">{children}</ul>
    </nav>
  );
};

export default Navbar;
