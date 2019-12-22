import React from 'react';

import { DialogProps } from './types';
import { Header, Paragraph } from '..';
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
          <li>
            <Paragraph className="dialog-list__item">{error}</Paragraph>
          </li>
        ))}
      </ul>
    );
  } else {
    contentToRender = (
      <Paragraph className="dialog__content">{content}</Paragraph>
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
