import React from 'react';

import { ModalProps } from './types';
import './styles.scss';
import { Button, Header } from '..';

const Modal: React.FC<ModalProps> = ({
  header,
  children,
  className = '',
  onClose = () => {},
}) => {
  return (
    <div className="modal-background">
      <section className={`modal ${className}`}>
        <Button
          type="button"
          iconType="times"
          className="modal__button-close"
          color="transparent"
          onClick={onClose}
        />
        <Header textAlign="center" heading={header} className="modal__header" />
        {children}
      </section>
    </div>
  );
};

export default Modal;
