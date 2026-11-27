import { ReactElement } from 'react';

export interface ScrollbarProps {
  children: ReactElement | ReactElement[];
  className?: string;
  color: 'light' | 'dark';
  containerHeight?: string; // height for the top container div
  containerWidth?: string; // width for the top cotainer div
  scrollbarPositionStartAtBottom?: boolean;
  // width for both the scrollbar track and scrollbar(because it has a width of 100%)
  scrollbarWidth?: string;
}
