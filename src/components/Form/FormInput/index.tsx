import React, { forwardRef } from 'react';

import { Dialog, Text } from 'components';
import { FormInputProps } from './types';
import './styles.scss';

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      type,
      inputId,
      className = '',
      error = [],
      onChange,
      onBlur,
      value = '',
      required = true,
    },
    ref
  ) => {
    const errorId = `${inputId}__error-message`;
    const hasError = Array.isArray(error) ? error.length > 0 : error !== '';
    let classNamesToAdd: string = 'form__field';

    if (className?.trim() !== '') {
      classNamesToAdd += ` ${className}`;
    }

    return (
      <div className={classNamesToAdd}>
        <label className="field-label" htmlFor={inputId}>
          {label}
          {required ? (
            <Text tag="span" size="xm" className="field-label__message">
              {' (Required)'}
            </Text>
          ) : (
            <Text tag="span" size="xm" className="field-label__message">
              {' (Optional)'}
            </Text>
          )}
        </label>
        <input
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError}
          className="field-input"
          id={inputId}
          onChange={onChange}
          onBlur={onBlur}
          name={inputId}
          ref={ref}
          type={type}
          value={value}
        />
        {/* In order for screen readers to announce the error,
          this div must be in the DOM. */}
        <div aria-live="polite" id={errorId}>
          {hasError && (
            <Dialog failure className="field-error" content={error} />
          )}
        </div>
      </div>
    );
  }
);

export default FormInput;
