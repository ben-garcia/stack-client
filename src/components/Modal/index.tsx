import React from 'react';

import { ModalProps } from './types';
import './styles.scss';

const Modal: React.FC<ModalProps> = ({
  header,
  className = '',
  style = {},
  children,
}) => {
  return (
    <div className={`modal ${className}`} style={style}>
      <header className="modal__header">{header}</header>
      {children}
    </div>
  );
};

export default Modal;
