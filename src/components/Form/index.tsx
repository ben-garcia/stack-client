import React from 'react';

import FormGroup from './FormGroup';
import FormInput from './FormInput';
import { FormComponent } from './types';
import './styles.scss';

/**
 * A Form is comprised of input fields.
 * @see FormGroup
 * @see FormInput
 */
const Form: FormComponent = ({ children, onSubmit, className = '' }) => {
  let classNamesToRender: string = 'form';

  if (className.trim() !== '') {
    classNamesToRender += ` ${className}`;
  }

  // when onSubmit prop is valid
  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className={classNamesToRender}>
        {children}
      </form>
    );
  }

  return <form className={classNamesToRender}>{children}</form>;
};

Form.Group = FormGroup;
Form.Input = FormInput;

export default Form;
