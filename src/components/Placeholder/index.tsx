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
    jsxToRender = (
      <div className="placeholder__message p-message" key={Math.random()}>
        {arr.map(() => (
          <div
            className="p-message__wrapper"
            style={{ height: `${(1 / numberOfTags) * 100}%` }}
          >
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
        ))}
        ;
      </div>
    );
  } else if (type === 'list') {
    jsxToRender = (
      <div className="placeholder__list p-list" key={Math.random()}>
        {arr.map(() => (
          <div
            className="p-list__wrapper"
            style={{ height: `${(1 / numberOfTags) * 100}%` }}
          >
            <div className="horizontal-bar" />
            <div className="horizontal-bar horizontal-bar--indented" />
            <div className="horizontal-bar horizontal-bar--indented" />
            <div className="horizontal-bar horizontal-bar--indented" />
            <div className="horizontal-bar horizontal-bar--indented" />
            <div className="horizontal-bar horizontal-bar--indented" />
          </div>
        ))}
      </div>
    );
  } else {
    jsxToRender = (
      <div className="placeholder__info p-info" key={Math.random()}>
        {arr.map(() => (
          <div
            className="p-info__wrapper"
            style={{ height: `${(1 / numberOfTags) * 100}%` }}
          >
            <div className="horizontal-bar horizontal-bar--extended" />
            <div className="horizontal-bar horizontal-bar--extended" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classesToAdd} style={styles}>
      {jsxToRender}
    </div>
  );
};

export default Placeholder;
