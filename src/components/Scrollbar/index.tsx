/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import { ScrollbarProps } from './types';
import './styles.scss';

const Scrollbar: React.FC<ScrollbarProps> = ({
  className = '',
  children,
  color,
  containerHeight = '',
  containerWidth = '',
  scrollbarPositionStartAtBottom = false,
  scrollbarWidth = '8px',
}) => {
  const [scrollbarIsVisible, setScrollbarIsVisible] = useState<boolean>(false);
  const lastPageY = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const [scrollbarIsBeingDragged, setScrollbarIsBeingDragged] = useState<
    boolean
  >(false);
  const [containerScrollHeight, setContainerScrollHeight] = useState<
    number | undefined
  >(containerRef.current?.scrollHeight);
  let classesToAdd: string = 'scrollbar-wrapper';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        containerRef.current &&
        containerScrollHeight !== containerRef.current?.scrollHeight &&
        scrollbarRef.current
      ) {
        // scrollHeight is the height of the container (including the hidden vertical scrollable content)
        // clientHeight is the height of the container (excluding the hidden content)
        const { clientHeight, scrollHeight, scrollTop } = containerRef.current;
        scrollbarRef.current.style.height = `${(clientHeight / scrollHeight) *
          100}%`;
        if (scrollbarPositionStartAtBottom) {
          // scroll all the way to the bottom of the content
          containerRef.current.scrollTop = scrollHeight;
          // scrollbar position starts at the bottom
          scrollbarRef.current.style.top = `${(scrollTop / scrollHeight) *
            100}%`;
        }
        setContainerScrollHeight(containerRef.current.scrollHeight);
        clearInterval(interval);
      }
    }, 200);
    // eslint-disable-next-line
  }, [containerRef.current?.scrollHeight, containerScrollHeight]);

  const onDrag = (e: MouseEvent) => {
    e.preventDefault();

    const { pageY } = e;
    const delta = pageY - lastPageY.current;
    lastPageY.current = pageY;
    const scrollRatio =
      containerRef.current!.clientHeight / containerRef.current!.scrollHeight;

    containerRef.current!.scrollTop += delta / scrollRatio;
    scrollbarRef.current!.style.top = `${(containerRef.current!.scrollTop /
      containerRef.current!.scrollHeight) *
      100}%`;
  };
  const onDragEnd = (e: MouseEvent) => {
    e.preventDefault();

    setScrollbarIsBeingDragged(false);
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  };

  // calculate the styles to add to the container div
  const containerStyles = { height: '', width: '' };
  // check for the height prop
  // if no height is passed in then use default(100%)
  if (containerHeight !== '') {
    containerStyles.height = containerHeight;
  }
  // check for the width
  // if no width is passed in then use default(100%)
  if (containerWidth !== '') {
    containerStyles.width = containerWidth;
  }

  // calculate the styles for the scrollbar track / scrollbar
  const scrollbarStyles = { width: '' };
  // make sure the prop passed in isn't equall to the default value and
  // that is isn't an empty string
  if (scrollbarWidth !== '8px' || scrollbarWidth.trim() !== '') {
    scrollbarStyles.width = scrollbarWidth;
  }

  return (
    <div className={classesToAdd} style={containerStyles}>
      <div
        className="scrollbar-wrapper__container"
        onMouseEnter={() => {
          if (!scrollbarIsVisible) {
            setScrollbarIsVisible(true);
          }
        }}
        onMouseLeave={() => {
          if (scrollbarIsVisible) {
            setScrollbarIsVisible(false);
          }
        }}
      >
        <div
          className="scrollbar-wrapper__content"
          onScroll={(e: React.UIEvent<HTMLDivElement>) => {
            if (scrollbarRef.current) {
              const { scrollHeight, scrollTop } = e.currentTarget;
              scrollbarRef.current.style.top = `${(scrollTop / scrollHeight) *
                100}%`;
            }
          }}
          ref={containerRef}
        >
          {children}
        </div>
        <div className="scrollbar-track" style={scrollbarStyles}>
          {/* show scrollbar only when the scrollable area is greater than
            the height of the div */}
          {containerRef.current &&
          containerRef.current?.scrollHeight -
            containerRef.current?.clientHeight >
            0 ? (
            <div
              className={
                scrollbarIsVisible || scrollbarIsBeingDragged
                  ? `scrollbar scrollbar--${color} scrollbar--visible`
                  : `scrollbar scrollbar--${color} scrollbar--invisible`
              }
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                // prevent text selection when dragging
                e.preventDefault();

                const { pageY } = e;
                lastPageY.current = pageY;
                setScrollbarIsBeingDragged(true);

                document.addEventListener('mousemove', onDrag);
                document.addEventListener('mouseup', onDragEnd);
              }}
              ref={scrollbarRef}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Scrollbar;
