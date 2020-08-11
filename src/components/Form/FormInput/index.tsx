import React from 'react';

import { Dialog, Text } from 'components';
import { FormInputProps } from './types';
import './styles.scss';

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  inputId,
  className = '',
  error = [],
  onChange,
  onBlur,
  value = '',
  required = true,
}) => {
  let classNamesToRender: string = 'form__field';

  if (className?.trim() !== '') {
    classNamesToRender += ` ${className}`;
  }

  return (
    <div className={classNamesToRender}>
      <label className="field-label" htmlFor={inputId}>
        {label}
        {required ? (
          <Text tag="span" size="xm" className="field-label__message">
            {' '}
            (Required)
          </Text>
        ) : (
          <Text tag="span" size="xm" className="field-label__message">
            {' '}
            (Optional)
          </Text>
        )}
      </label>
      <input
        onChange={onChange}
        onBlur={onBlur}
        className="field-input"
        name={inputId}
        id={inputId}
        type={type}
        value={value}
      />
      {error !== '' && error.length > 0 && (
        <Dialog failure className="field-error" content={error} />
      )}
    </div>
  );
};

export default FormInput;
