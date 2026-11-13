import React from 'react';

import ListItem from './ListItem';
import { ListComponent } from './types';
import './styles.scss';

const List: ListComponent = ({
  ariaLive = undefined,
  ariaLabel = undefined,
  role = undefined,
  className = ' ',
  children,
  tabIndex = undefined,
}) => {
  let classesToAdd: string = 'list';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <ul
      aria-label={ariaLabel}
      aria-live={ariaLive}
      className={classesToAdd}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </ul>
  );
};

List.Item = ListItem;

export default List;
