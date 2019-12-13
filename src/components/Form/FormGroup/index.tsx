import React from 'react';

import { FormGroupProps } from './types';
import './styles.scss';

/**
 * FromGroup displays a collection of related input fields.
 */
const FormGroup: React.FC<FormGroupProps> = ({ children }) => {
  return <fieldset className="form-group">{children}</fieldset>;
};

export default FormGroup;
