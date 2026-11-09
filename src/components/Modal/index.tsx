/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import { ModalProps } from './types';
import './styles.scss';
import { Button, Header, Icon } from '..';

const Modal: React.FC<ModalProps> = ({
  nonModal = false,
  header = '',
  children,
  size = '',
  className = '',
  onClose = () => {},
  background = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // keeps track of all classes to add to the modal
  let classesToAdd: string = 'modal';
  const modalId = useMemo(
    () =>
      Math.random()
        .toString(36)
        .substring(2, 8),
    []
  );

  // runs synchronously
  useLayoutEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button:enabled, input:enabled, textarea:enabled, select:enabled, a[href]'
    );
    const first = focusableElements![0];
    if (!first) return;

    first.focus();
  }, []);

  // make sure className isn't empty
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // if size is specified
  if (size?.trim() !== '') {
    classesToAdd += ` modal--${size}`;
  }

  const handleKeypress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = modalRef.current!.querySelectorAll<
          HTMLElement
        >(
          'button:enabled, input:enabled, textarea:enabled, select:enabled, a[href]'
        );

        if (focusableElements.length === 0) return;

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement =
          focusableElements[focusableElements.length - 1];

        // Shift + Tab: If the first element has focus,
        // wrap to the last focusable element
        if (
          event.shiftKey &&
          document.activeElement === firstFocusableElement
        ) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
        // Tab: If the last element has focus,
        // wrap to the first focusable element
        else if (
          !event.shiftKey &&
          document.activeElement === lastFocusableElement
        ) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    },
    [onClose]
  );

  const handleClick = useCallback(() => {
    onClose();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className={
          background
            ? 'modal-background modal-background--dark'
            : 'modal-background modal-background--transparent'
        }
        onClick={handleClick}
      />
      <div className="modal-container">
        <section
          aria-modal="true"
          aria-labelledby={!nonModal ? `modal-${modalId}__label` : undefined}
          aria-describedby={
            !nonModal ? `modal-${modalId}__description` : undefined
          }
          role="dialog"
          ref={modalRef}
          className={classesToAdd}
        >
          {header?.trim() !== '' && (
            <Button
              ariaLabel="Close the modal"
              type="button"
              className="modal__button-close"
              color="transparent"
              onClick={onClose}
            >
              <Icon
                type="times"
                color="black"
                size="sm"
                className="modal__times-icon"
              />
            </Button>
          )}
          {header?.trim() !== '' && (
            <Header
              className="modal__header"
              headerPosition="center"
              heading={header}
              modalId={modalId}
            />
          )}
          {React.Children.map(children, child => {
            if (React.isValidElement<any>(child)) {
              return React.cloneElement(child, { modalId });
            }
            return child;
          })}
        </section>
      </div>
    </>,
    document.getElementById('modal-root') as Element
  );
};

export default Modal;
