import React from "react";

interface ValidRefTarget {
  contains(target: EventTarget | null): any;
}

function useClickOutSide(ref: React.RefObject<ValidRefTarget>, handlerClick: () => void) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handlerClick]);
}

export default useClickOutSide;
