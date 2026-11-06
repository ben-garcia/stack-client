import React from 'react';

import { ListItemProps } from './types';
import './styles.scss';

const ListItem: React.FC<ListItemProps> = ({
  active = false,
  children,
  className = '',
  hover = true,
  role = undefined,
}) => {
  let classesToAdd: string = 'list__item';

  if (hover) {
    classesToAdd += ' list__item--hoverable';
  }

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  if (active) {
    classesToAdd += ' list__item--active';
  }

  return (
    <li role={role} className={classesToAdd}>
      {children}
    </li>
  );
};

export default ListItem;
