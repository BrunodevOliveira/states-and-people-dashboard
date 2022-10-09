import { useCallback, useRef } from "react";

export const useDebounce = (delay = 300, noteDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(noteDelayInFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      // Executa logo na primeira vez que é chamado essa função
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          //Se já existir um timeout cadastrado, será cancelado e logo após adiciono um novo timeout que espera 300ms
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};
