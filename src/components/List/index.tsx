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
}) => {
  let classesToAdd: string = 'list';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <ul
      aria-label={ariaLabel}
      role={role}
      aria-live={ariaLive}
      className={classesToAdd}
    >
      {children}
    </ul>
  );
};

List.Item = ListItem;

export default List;
