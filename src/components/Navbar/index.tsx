import React from 'react';

import './styles.scss';
import { NavbarProps } from './types';

const Navbar: React.FC<NavbarProps> = ({
  style = {},
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
      style={style}
    >
      <ul className="navigation__inner">{children}</ul>
    </nav>
  );
};

export default Navbar;
