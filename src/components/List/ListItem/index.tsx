import React from 'react';

import { ListItemProps } from './types';
import './styles.scss';

const ListItem: React.FC<ListItemProps> = ({
  active = false,
  children,
  className = '',
}) => {
  let classesToAdd: string = 'list__item';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  if (active) {
    classesToAdd += ' list__item--active';
  }

  return <li className={classesToAdd}>{children}</li>;
};

export default ListItem;
