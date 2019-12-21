export interface DialogProps {
  content: string; // main message to display
  header?: string;
  success?: boolean; // dialog color is green
  failure?: boolean; // dialog color is red
}
