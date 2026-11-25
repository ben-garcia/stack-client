import React from 'react';

import { PlaceholderProps } from './types';
import './styles.scss';

const Placeholder: React.FC<PlaceholderProps> = ({
  className = '',
  color = 'dark',
  height = '',
  numberOfTags = 1,
  type,
  width = '',
}) => {
  const classesToAdd = ['placeholder', className.trim()]
    .filter(Boolean)
    .join(' ');
  let jsxToRender: React.ReactNode;
  const styles = { height: '', width: '' };

  if (height.trim() !== '') styles.height = height;
  if (width.trim() !== '') styles.width = width;

  // used to get the number of tags to render
  const arr: number[] = [];
  for (let i = 0; i < numberOfTags; i += 1) {
    arr.push(i);
  }

  if (type === 'message') {
    jsxToRender = (
      <div className="placeholder__message p-message">
        {arr.map(index => (
          <div
            className="p-message__wrapper"
            style={{ height: `${(1 / numberOfTags) * 100}%` }}
            key={index}
          >
            <div className={`p-message__date placeholder--${color}`} />
            <div className="p-message__inner">
              <div className={`p-circle placeholder--${color}`} />
              <div className="p-message__inner-two">
                <div
                  className={`p-message__horizontal-bar placeholder--${color}`}
                />
                <div
                  className={`p-message__horizontal-bar placeholder--${color}`}
                />
                <div
                  className={`p-message__horizontal-bar p-message__horizontal-bar--extended placeholder--${color}`}
                />
                <div
                  className={`p-message__horizontal-bar p-message__horizontal-bar--extended placeholder--${color}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (type === 'list') {
    jsxToRender = (
      <div className="placeholder__list p-list">
        {arr.map(index => (
          <div
            className="p-list__wrapper"
            style={{ height: '20%' }}
            key={index}
          >
            <div className={`horizontal-bar placeholder--${color}`} />
            <div
              className={`horizontal-bar horizontal-bar--indented placeholder--${color}`}
            />
            <div
              className={`horizontal-bar horizontal-bar--indented placeholder--${color}`}
            />
            <div
              className={`horizontal-bar horizontal-bar--indented placeholder--${color}`}
            />
            <div
              className={`horizontal-bar horizontal-bar--indented placeholder--${color}`}
            />
            <div
              className={`horizontal-bar horizontal-bar--indented placeholder--${color}`}
            />
          </div>
        ))}
      </div>
    );
  } else {
    jsxToRender = (
      <div className="placeholder__info p-info">
        {arr.map(index => (
          <div
            className="p-info__wrapper"
            style={{ height: `${(1 / numberOfTags) * 100}%` }}
            key={index}
          >
            <div
              className={`horizontal-bar horizontal-bar--extended horizontal-bar--block placeholder--${color}`}
            />
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
