import React from 'react';

import FormGroup from './FormGroup';
import { FormComponent } from './types';
import './styles.scss';

/**
 * A Form is comprised of input fields.
 * @see FormGroup
 */
const Form: FormComponent = ({ children }) => {
  return <form className="form">{children}</form>;
};

Form.Group = FormGroup;

export default Form;
