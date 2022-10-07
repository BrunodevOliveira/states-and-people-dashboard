import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //Parecido com o state, mas com ele podemos enviar os dados pesquisados para a url

  const busca = useMemo(() => {
    return searchParams.get("busca") || ""; //retorna o texto salvo na chave "busca" que foi passado no setSearchParams
  }, [searchParams]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
      sds
    </LayoutBaseDePagina>
  );
};
