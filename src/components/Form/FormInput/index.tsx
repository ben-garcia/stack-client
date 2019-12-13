import React from 'react';

import { FormInputProps } from './types';
import './styles.scss';

const FormInput: React.FC<FormInputProps> = ({ label, type }) => {
  return <input type={type} placeholder={label} />;
};

export default FormInput;
