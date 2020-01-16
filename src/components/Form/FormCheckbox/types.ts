import { ChangeEvent, FocusEvent } from 'react';

/**
 * Describes an checkbox element
 */
export interface FormCheckboxProps {
  label: string; // label on the input element
  inputId: string; // id used to connect label to input
  className?: string; // add more styles via a class
  error?: string | string[]; // error message/s to display
  // function to be called when the value of the input changes
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // function to be called when the input losses focus
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  value?: string;
}
