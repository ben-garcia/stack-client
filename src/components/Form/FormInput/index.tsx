import React from 'react';

import { Dialog } from '../..';
import { FormInputProps } from './types';
import './styles.scss';

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  inputId,
  className = '',
  error = [],
}) => {
  let classNamesToRender: string = 'form__field';

  if (className.trim() !== '') {
    classNamesToRender += ` ${className}`;
  }

  return (
    <div className={classNamesToRender}>
      <label className="field-label" htmlFor={inputId}>
        {label}
      </label>
      <input className="field-input" id={inputId} type={type} />
      <Dialog failure className="field-error" content={error} />
    </div>
  );
};

export default FormInput;
