import { FormEvent } from 'react';

import FormGroup from './FormGroup';
import FormInput from './FormInput';

export interface FormProps {
  className?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode[] | React.ReactNode;
}

/** Structure that describes the components that make up a Form  */
export interface FormComponent extends React.FC<FormProps> {
  Group: typeof FormGroup;
  Input: typeof FormInput;
}
