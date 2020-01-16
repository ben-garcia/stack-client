import { FormEvent } from 'react';

import FormGroup from './FormGroup';
import FormInput from './FormInput';
import FormCheckbox from './FormCheckbox';

export interface FormProps {
  className?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode[] | React.ReactNode;
}

/** Structure that describes the components that make up a Form  */
export interface FormComponent extends React.FC<FormProps> {
  Checkbox: typeof FormCheckbox;
  Group: typeof FormGroup;
  Input: typeof FormInput;
}
