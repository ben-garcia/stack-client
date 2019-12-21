import React from 'react';

import { DialogProps } from './types';
import { Header, Paragraph } from '..';
import './styles.scss';

const Dialog: React.FC<DialogProps> = ({
  header = '',
  content,
  success = false,
  failure = false,
}) => {
  let classesToAdd: string = 'dialog';

  if (success && !failure) {
    classesToAdd += ' dialog--success';
  }

  if (failure && !success) {
    classesToAdd += ' dialog--failure';
  }

  return (
    <section className={classesToAdd}>
      {header.trim() !== '' && (
        <Header as="h2" heading={header} className="dialog__header" />
      )}
      <Paragraph className="dialog__content">{content}</Paragraph>
    </section>
  );
};

export default Dialog;
