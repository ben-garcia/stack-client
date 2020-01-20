import React from 'react';

import { ModalProps } from './types';
import './styles.scss';
import { Button, Header, Icon } from '..';

const Modal: React.FC<ModalProps> = ({
  header,
  children,
  size = '',
  className = '',
  onClose = () => {},
}) => {
  // keeps track of all classes to add to the modal
  let classesToAdd: string = 'modal';

  // make sure className isn't empty
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // if size is specified
  if (size?.trim() !== '') {
    classesToAdd += ` modal--${size}`;
  }

  return (
    <div className="modal-background">
      <section className={classesToAdd}>
        <Button
          type="button"
          className="modal__button-close"
          color="transparent"
          onClick={onClose}
        >
          <Icon type="times" color="black" size="sm" />
        </Button>
        <Header
          headerPosition="center"
          heading={header}
          className="modal__header"
        />
        {children}
      </section>
    </div>
  );
};

export default Modal;
