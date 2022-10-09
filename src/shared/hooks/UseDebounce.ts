import { useCallback, useRef } from "react";

/**
 * ~ O setTimeout irá executar a função de busca na API após passar o tempo estabelecido(delay)
 ** Para evitar diversas requisições a cada letra digitada, limpamos o setTimout antes que ele execute a função de requisição
 * isso só é possível graças ao useEffect que é executadato sempre que a variável "busca" é alterada
 */

export const useDebounce = (delay = 300, noteDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>(); //Qdo quero armazrnar um valor e altera-lo com uma ação do usuário sem que o componente seja rerenderizado
  const isFirstTime = useRef(noteDelayInFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      //^Recebe uma função como parâmetro e a executa no bloco de código da função do useCallBack

      if (isFirstTime.current) {
        // Executa logo na primeira vez que é chamado essa função
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          //Se já existir um timeout cadastrado, será cancelado e logo após adiciono um novo timeout que espera 300ms
          clearTimeout(debouncing.current);
        }
        //func só é executada após o delay, isso é tempo suficiente para limpar a execução so setTimout caso o usuário ainda esteja digitando
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};
