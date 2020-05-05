import React from 'react';

import { PlaceholderProps } from './types';
import './styles.scss';

const Placeholder: React.FC<PlaceholderProps> = ({
  className = '',
  height = '',
  numberOfTags = 1,
  type,
  width = '',
}) => {
  let classesToAdd: string = 'placeholder';
  let jsxToRender: React.ReactNode;
  const styles = { height: '', width: '' };
  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }
  if (height.trim() !== '') {
    styles.height = height;
  }
  if (width.trim() !== '') {
    styles.width = width;
  }

  // used to get the number of tags to render
  const arr: number[] = [];
  for (let i = 0; i < numberOfTags; i += 1) {
    arr.push(i);
  }

  if (type === 'message') {
    jsxToRender = arr.map(() => (
      <div className="placeholder__message p-message">
        <div className="p-message__date" />
        <div className="p-message__inner">
          <div className="p-circle" />
          <div className="p-message__inner-two">
            <div className="p-message__horizontal-bar" />
            <div className="p-message__horizontal-bar" />
            <div className="p-message__horizontal-bar p-message__horizontal-bar--extended" />
            <div className="p-message__horizontal-bar p-message__horizontal-bar--extended" />
          </div>
        </div>
      </div>
    ));
  } else if (type === 'list') {
    jsxToRender = arr.map(() => (
      <div className="placeholder__list">
        <div className="p-wrapper">
          <div className="horizontal-bar" />
          <div className="horizontal-bar horizontal-bar--indented" />
          <div className="horizontal-bar horizontal-bar--indented" />
          <div className="horizontal-bar horizontal-bar--indented" />
          <div className="horizontal-bar horizontal-bar--indented" />
          <div className="horizontal-bar horizontal-bar--indented" />
        </div>
      </div>
    ));
  } else {
    jsxToRender = arr.map(() => (
      <div className="placeholder__info p-info">
        <div className="horizontal-bar horizontal-bar--extended" />
        <div className="horizontal-bar horizontal-bar--extended" />
      </div>
    ));
  }

  return (
    <div className={classesToAdd} style={styles}>
      {jsxToRender}
    </div>
  );
};

export default Placeholder;
