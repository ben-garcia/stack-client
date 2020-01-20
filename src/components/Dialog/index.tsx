import React from 'react';

import { DialogProps } from './types';
import { Header, Text } from '..';
import './styles.scss';

const Dialog: React.FC<DialogProps> = ({
  header = '',
  content,
  success = false,
  failure = false,
  className = '',
}) => {
  let classesToAdd: string = 'dialog';
  let contentToRender: React.ReactNode;

  if (success && !failure) {
    classesToAdd += ' dialog--success';
  }

  if (failure && !success) {
    classesToAdd += ' dialog--failure';
  }

  // if the className prop isn't empty
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // check if content being passed in an array
  if (typeof content === 'object') {
    contentToRender = (
      <ul className="dialog-list">
        {content.map(error => (
          <li key={error}>
            <Text tag="div" className="dialog-list__item">
              {error}
            </Text>
          </li>
        ))}
      </ul>
    );
  } else {
    contentToRender = (
      <Text className="dialog__content">{content !== '' && content}</Text>
    );
  }

  return (
    <section className={classesToAdd}>
      {header.trim() !== '' && (
        <Header as="h2" heading={header} className="dialog__header" />
      )}
      {contentToRender}
    </section>
  );
};

export default Dialog;
