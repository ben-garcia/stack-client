export interface DialogProps {
  content: string | string[]; // message/s to display
  header?: string;
  success?: boolean; // dialog color is green
  failure?: boolean; // dialog color is red
  className?: string; // customize styles
}
