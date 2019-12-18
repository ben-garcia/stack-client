import React from 'react';

import { FormInputProps } from './types';
import './styles.scss';

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  className = '',
}) => {
  let classNamesToRender: string = 'form__input';

  if (className.trim() !== '') {
    classNamesToRender += ` ${className}`;
  }

  return (
    <input type={type} placeholder={label} className={classNamesToRender} />
  );
};

export default FormInput;
