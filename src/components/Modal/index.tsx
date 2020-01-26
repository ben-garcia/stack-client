import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { ModalProps } from './types';
import './styles.scss';
import { Button, Header, Icon } from '..';

const Modal: React.FC<ModalProps> = ({
  header,
  children,
  size = '',
  className = '',
  onClose = () => {},
  background = true,
}) => {
  // background div ref
  const backgroundRef = useRef<HTMLDivElement>(null);
  // keeps track of all classes to add to the modal
  let classesToAdd: string = 'modal';

  // runs synchronously
  useLayoutEffect(() => {
    if (backgroundRef?.current) {
      backgroundRef.current.focus();
    }
  }, []);

  // make sure className isn't empty
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // if size is specified
  if (size?.trim() !== '') {
    classesToAdd += ` modal--${size}`;
  }

  return createPortal(
    <div
      ref={background ? backgroundRef : null}
      role="button"
      tabIndex={0}
      className={
        background
          ? 'modal-background modal-background--dark'
          : 'modal-background modal-background--transparent'
      }
      onClick={e => {
        // close modal ONLY when background is clicked
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
      onKeyUp={e => {
        // close modal when escape key is pressed
        if (e.keyCode === 27) {
          onClose();
        }
      }}
    >
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
    </div>,
    document.getElementById('modal-root') as Element
  );
};

export default Modal;
