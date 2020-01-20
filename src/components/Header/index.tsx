import React from 'react';

import './styles.scss';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  className = '',
  heading,
  as = 'h1',
  headerPosition = 'center',
  children,
}) => {
  // classnames that are to be added to the heading itself.
  let classNamesToAdd: string = 'header';

  if (className?.trim() !== '') {
    classNamesToAdd += ` ${className}`;
  }

  // classnames to the heading element which is dependent on headerPosition prop.
  let headingClassNamesToAdd: string = 'header__heading--center';

  if (headerPosition === 'left') {
    headingClassNamesToAdd = 'header__heading--left';
  } else if (headerPosition === 'right') {
    headingClassNamesToAdd = 'header__heading--right';
  }

  // variable will contain the correct heading tag.
  let headingToRender: JSX.Element;

  switch (as) {
    case 'h2':
      headingClassNamesToAdd += ' header__heading--xlg';
      headingToRender = (
        <h2 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h2>
      );
      break;
    case 'h3':
      headingClassNamesToAdd += ' header__heading--lg';
      headingToRender = (
        <h3 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h3>
      );
      break;
    case 'h4':
      headingClassNamesToAdd += ' header__heading--md';
      headingToRender = (
        <h4 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h4>
      );
      break;
    case 'h5':
      headingClassNamesToAdd += ' header__heading--sm';
      headingToRender = (
        <h5 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h5>
      );
      break;
    case 'h6':
      headingClassNamesToAdd += ' header__heading--xm';
      headingToRender = (
        <h6 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h6>
      );
      break;
    default:
      headingClassNamesToAdd += ' header__heading--xxl';
      headingToRender = (
        <h1 className={`header__heading ${headingClassNamesToAdd}`}>
          {heading}
        </h1>
      );
  }

  return (
    <header className={classNamesToAdd}>
      {headingToRender}
      {children}
    </header>
  );
};

export default Header;
