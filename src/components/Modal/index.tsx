import React, { useState } from 'react';

import { ModalProps } from './types';
import './styles.scss';
import { Button, Header } from '..';

const Modal: React.FC<ModalProps> = ({
  header,
  open = true,
  className = '',
  children,
}) => {
  // control the opacity property.
  const [isOpen, setIsOpen] = useState<boolean>(open);
  // close when the Button is pressed.
  const handleClick = () => setIsOpen(false);

  return (
    <div className="modal-background">
      <section
        style={{
          opacity: isOpen ? 1 : 0,
        }}
        className={`modal ${className}`}
      >
        <Button
          type="button"
          iconType="times"
          className="modal__button-close"
          color="transparent"
          onClick={handleClick}
        />
        <Header textAlign="center" heading={header} className="modal__header" />
        {children}
      </section>
    </div>
  );
};

export default Modal;
