/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import { ChannelList, TeammatesList, Workspace } from 'components';
import { WorkspaceSidebarProps } from './types';
import './styles.scss';

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  className = '',
}) => {
  const [scrollbarIsVisible, setScrollbarIsVisible] = useState<boolean>(false);
  const [scrollbarHeight, setScrollbarHeight] = useState<number>(0);
  const [scrollbarPosition, setScrollbarPosition] = useState<number>(0);
  const [scrollbarIsBeingDragged, setScrollbarIsBeingDragged] = useState<
    boolean
  >(false);
  const [scrollbarScrollTop, setScrollbarScrollTop] = useState<number>(
    window.pageYOffset
  );
  const [containerScrollHeight, setContainerScrollHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  let classesToAdd: string = 'workspace-sidebar';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        if (navigator.userAgent.search('Chrome') !== -1) {
          // when Chrome is detected add some pixels to reach 310(286 default)
          setScrollbarHeight(
            containerRef.current.scrollHeight +
              25 -
              containerRef.current.clientHeight
          );
        } else {
          // scrollHeight is the height of the container (including the hidden vertical scrollable content)
          // clientHeight is the height of the container (excluding the hidden content)
          setScrollbarHeight(
            containerRef.current.scrollHeight -
              containerRef.current.clientHeight
          );
        }
        setContainerScrollHeight(containerRef.current.scrollHeight);
      }
      clearInterval(interval);
    }, 100);
  }, [containerScrollHeight]);

  return (
    <div className={classesToAdd}>
      <Workspace />
      <div
        className="workspace-sidebar__container"
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
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          const currentTargetScrollTop = e.currentTarget.scrollTop;

          if (scrollbarScrollTop < currentTargetScrollTop) {
            setScrollbarPosition(currentTargetScrollTop * 2.25);
          } else {
            setScrollbarPosition(currentTargetScrollTop);
          }
          setScrollbarScrollTop(currentTargetScrollTop * -2.2);
        }}
        ref={containerRef}
      >
        <ChannelList />
        <TeammatesList />
        <div
          className={
            scrollbarIsVisible
              ? 'scrollbar scrollbar--visible'
              : 'scrollbar scrollbar--invisible'
          }
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            setScrollbarIsBeingDragged(true);
            // eslint-disable-next-line
            console.log('mouse down: ', e);
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            if (scrollbarIsBeingDragged === true) {
              // eslint-disable-next-line
              console.log('mouse leave: ', e);
              setScrollbarIsBeingDragged(false);
            }
          }}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
            if (scrollbarIsBeingDragged === true) {
              // eslint-disable-next-line
              console.log('mouse move: ', e.clientY);
            }
          }}
          onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => {
            setScrollbarIsBeingDragged(false);
            // eslint-disable-next-line
            console.log('mouse up: ', e);
          }}
          style={{
            height: `${scrollbarHeight}px`,
            transform: `translateY(${scrollbarPosition}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
