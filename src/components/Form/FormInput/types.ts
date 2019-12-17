/**
 * Describes an input element
 */
export interface FormInputProps {
  label: string; // label on the input element
  type: 'text' | 'email' | 'password'; // type of input
  className?: string; // add more styles via a class
}
