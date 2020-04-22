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
      if (containerRef.current && containerRef.current?.scrollHeight) {
        // scrollHeight is the height of the container (including the hidden vertical scrollable content)
        // clientHeight is the height of the container (excluding the hidden content)
        // setScrollbarHeight(
        //   containerRef.current.scrollHeight - containerRef.current.offsetHeight
        // );
        setScrollbarHeight(
          containerRef.current.scrollHeight * -0.25 +
            containerRef.current.clientHeight
        );
        setContainerScrollHeight(containerRef.current.scrollHeight);
        clearInterval(interval);
      }
    }, 200);
  }, [containerScrollHeight]);

  return (
    <div className={classesToAdd}>
      <Workspace />
      <div className="workspace-sidebar__container">
        <div
          className="workspace-sidebar__inner"
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

            // scrolling down
            if (scrollbarScrollTop < currentTargetScrollTop) {
              setScrollbarPosition(currentTargetScrollTop * 0.85);
            } else {
              // scrolling up
              setScrollbarPosition(currentTargetScrollTop);
            }
            setScrollbarScrollTop(currentTargetScrollTop * -0.85);
          }}
          ref={containerRef}
        >
          <ChannelList />
          <TeammatesList />
        </div>
        <div className="scrollbar-track">
          <div
            className={
              scrollbarIsVisible
                ? 'scrollbar scrollbar--visible'
                : 'scrollbar scrollbar--invisible'
            }
            style={{
              height: `${scrollbarHeight}px`,
              transform: `translateY(${scrollbarPosition}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
