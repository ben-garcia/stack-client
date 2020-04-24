/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import { ChannelList, TeammatesList, Workspace } from 'components';
import { WorkspaceSidebarProps } from './types';
import './styles.scss';

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  className = '',
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
  let classesToAdd: string = 'workspace-sidebar';

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
        const { clientHeight, scrollHeight } = containerRef.current;
        scrollbarRef.current.style.height = `${(clientHeight / scrollHeight) *
          100}%`;
        setContainerScrollHeight(containerRef.current.scrollHeight);
        clearInterval(interval);
      }
    }, 200);
    // eslint-disable-next-line
  }, [containerRef.current?.scrollHeight, containerScrollHeight]);

  const onDrag = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    e.stopPropagation();
    setScrollbarIsBeingDragged(false);

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  };

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
      >
        <div
          className="workspace-sidebar__inner"
          onScroll={(e: React.UIEvent<HTMLDivElement>) => {
            const { scrollHeight, scrollTop } = e.currentTarget;
            scrollbarRef.current!.style.top = `${(scrollTop / scrollHeight) *
              100}%`;
          }}
          ref={containerRef}
        >
          <ChannelList />
          <TeammatesList />
        </div>
        <div className="scrollbar-track">
          <div
            className={
              scrollbarIsVisible || scrollbarIsBeingDragged
                ? 'scrollbar scrollbar--visible'
                : 'scrollbar scrollbar--invisible'
            }
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
              const { pageY } = e;
              lastPageY.current = pageY;
              setScrollbarIsBeingDragged(true);

              document.addEventListener('mousemove', onDrag);
              document.addEventListener('mouseup', onDragEnd);
            }}
            ref={scrollbarRef}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
