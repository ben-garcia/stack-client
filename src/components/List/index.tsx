import React from 'react';

import ListItem from './ListItem';
import { ListComponent } from './types';
import './styles.scss';

const List: ListComponent = ({ className = ' ', children }) => {
  let classesToAdd: string = 'list';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return <ul className={classesToAdd}>{children}</ul>;
};

List.Item = ListItem;

export default List;
