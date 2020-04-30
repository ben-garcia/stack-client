export interface ScrollbarProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  color: 'light' | 'dark';
  height?: string;
  scrollbarPositionStartAtBottom?: boolean;
  width?: string;
}
