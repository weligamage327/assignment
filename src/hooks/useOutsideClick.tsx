import { useEffect, useCallback } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};
