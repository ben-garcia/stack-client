import React from 'react';

import { Dialog } from '../..';
import { FormCheckboxProps } from './types';
import './styles.scss';

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  inputId,
  className = '',
  error = [],
  onChange,
  onBlur,
  value = '',
}) => {
  let classesToAdd: string = 'form__field';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      <div className="form__checkbox">
        <label className="form__label" htmlFor={inputId}>
          {label}
        </label>
        <input
          type="checkbox"
          onChange={onChange}
          onBlur={onBlur}
          className="form__input"
          name={inputId}
          id={inputId}
          value={value}
        />
        {error !== '' && error.length > 0 && (
          <Dialog failure className="field-error" content={error} />
        )}
      </div>
    </div>
  );
};

export default FormCheckbox;
