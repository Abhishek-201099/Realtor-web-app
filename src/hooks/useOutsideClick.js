import { useEffect, useRef } from "react";

export default function useOutsideClick(onClick, capturingPhase = false) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          onClick?.();
        }
      }

      function handleKeyDown(e) {
        if (e.key === "Escape") onClick?.();
      }

      document.addEventListener("click", handleClick, capturingPhase);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("click", handleClick, capturingPhase);
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [onClick, capturingPhase]
  );

  return ref;
}
