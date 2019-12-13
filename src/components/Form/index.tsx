import React from 'react';

import { FormProps } from './types';
import './styles.scss';

const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="form">{children}</form>;
};

export default Form;
