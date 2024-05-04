import { RefObject, useEffect } from "react";
export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void
) => {
  useEffect(() => {
    const listenerHandler = (e: Event) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node) || null) {
        return;
      }
      handler(e);
    };
    window.addEventListener("mousedown", listenerHandler);
    return window.removeEventListener("mousedown", listenerHandler);
  }, [ref, handler]);
};
