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
  // keeps track of all classes to add to the modal
  let classesToAdd: string = 'modal';

  // make sure className isn't empty
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className="modal-background">
      <section className={classesToAdd}>
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
