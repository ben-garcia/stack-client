import React from 'react';

import './styles.scss';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  className = '',
  heading,
  as = 'h1',
  textAlign = 'left',
  children,
}) => {
  // classnames that are to be added to the heading itself.
  let classNamesToAdd: string = 'header';

  if (className.trim() !== '') {
    classNamesToAdd += ` ${className}`;
  }

  // classnames to the heading element which is dependent on textAlign prop.
  let headingClassNamesToAdd: string = 'header__heading--left';

  if (textAlign === 'center') {
    headingClassNamesToAdd = 'header__heading--center';
  } else if (textAlign === 'right') {
    headingClassNamesToAdd = 'header__heading--right';
  }

  // variable will contain the correct heading tag.
  let headingToRender: JSX.Element = (
    <h1 className={`header__heading ${headingClassNamesToAdd}`}>{heading}</h1>
  );

  switch (as) {
    case 'h2':
      headingToRender = (
        <h2 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h2>
      );
      break;
    case 'h3':
      headingToRender = (
        <h3 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h3>
      );
      break;
    case 'h4':
      headingToRender = (
        <h4 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h4>
      );
      break;
    case 'h5':
      headingToRender = (
        <h5 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h5>
      );
      break;
    case 'h6':
      headingToRender = (
        <h6 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h6>
      );
      break;
    default:
  }

  return (
    <header className={classNamesToAdd}>
      {headingToRender}
      {children}
    </header>
  );
};

export default Header;
