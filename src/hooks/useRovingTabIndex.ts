import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Workspace } from 'store/workspaces';
import { Channel } from 'store/channels';
import { Teammate } from 'store/teammates';

type ItemType = Workspace | Channel | Teammate;

const useRovingTabIndex = (items: ItemType[], currentItem: ItemType) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, items.length);
  }, [items.length]);

  useEffect(() => {
    const index = items.findIndex(item => item.id === currentItem.id);
    if (index !== -1) {
      // Indicates either there is no currentChannel or currentTeammate so,
      // leave at 0 -- which sets the first channel/teammate in the tab order.
      setFocusedIndex(index);
    }
  }, [items.length, currentItem.id]);

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    // Nothing to do when there are no items to render.
    if (items.length === 0) return;

    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp': {
        e.preventDefault(); // Prevent default scrolling behavior.
        newIndex = index === 0 ? items.length - 1 : index - 1;
        break;
      }
      case 'ArrowLeft':
      case 'ArrowDown': {
        e.preventDefault();
        newIndex = index === items.length - 1 ? 0 : index + 1;
        break;
      }
      case 'Home': {
        e.preventDefault();
        newIndex = 0;
        break;
      }
      case 'End': {
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      }
      default:
        return;
    }

    setFocusedIndex(newIndex);
    buttonRefs.current[newIndex]?.focus();
  };

  return { buttonRefs, focusedIndex, handleKeyDown };
};

export default useRovingTabIndex;
