import React from 'react';
import ListItem from './ListItem';

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  ariaLive?: 'off' | 'assertive' | 'polite';
  role?: string;
  ariaLabel?: string;
}

// nested components for the List component
export interface ListComponent extends React.FC<ListProps> {
  Item: typeof ListItem;
}
