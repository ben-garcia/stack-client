import React from 'react';

import './styles.scss';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  className = '',
  headingClassName = '',
  style = {},
  heading,
  as = 'h1',
  children,
}) => {
  // variable will contain the correct heading tag.
  let headingToRender: JSX.Element = (
    <h1 className={`header__heading ${headingClassName}`}>{heading}</h1>
  );

  switch (as) {
    case 'h2':
      headingToRender = (
        <h2 className={`header__heading ${headingClassName}`}>{heading}</h2>
      );
      break;
    case 'h3':
      headingToRender = (
        <h3 className={`header__heading ${headingClassName}`}>{heading}</h3>
      );
      break;
    case 'h4':
      headingToRender = (
        <h4 className={`header__heading ${headingClassName}`}>{heading}</h4>
      );
      break;
    case 'h5':
      headingToRender = (
        <h5 className={`header__heading ${headingClassName}`}>{heading}</h5>
      );
      break;
    case 'h6':
      headingToRender = (
        <h6 className={`header__heading ${headingClassName}`}>{heading}</h6>
      );
      break;
    default:
  }

  return (
    <header style={style} className={`header ${className}`}>
      {headingToRender}
      {children}
    </header>
  );
};

export default Header;
