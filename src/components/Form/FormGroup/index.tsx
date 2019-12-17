import React from 'react';

import { FormGroupProps } from './types';
import './styles.scss';

/**
 * FromGroup displays a collection of related input fields.
 */
const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => {
  let classNamesToAdd: string = 'form__group';

  if (className.trim() !== '') {
    classNamesToAdd += ` ${className}`;
  }

  return <fieldset className={classNamesToAdd}>{children}</fieldset>;
};

export default FormGroup;
