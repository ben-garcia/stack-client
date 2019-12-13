import FormGroup from './FormGroup';

export interface FormProps {
  children: React.ReactNode[];
}

/** Structure that describes the components that make up a Form  */
export interface FormComponent extends React.FC<FormProps> {
  Group: typeof FormGroup;
}
