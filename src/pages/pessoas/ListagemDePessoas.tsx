import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //Parecido com o state, mas com ele podemos enviar os dados pesquisados para a url

  const busca = useMemo(() => {
    return searchParams.get("busca") || ""; //retorna o texto salvo na chave "busca" que foi passado no setSearchParams
  }, [searchParams]);

  useEffect(() => {
    PessoasService.getAll(1, busca).then((result) => {
      if (result instanceof Error) return alert(result.message);

      console.log(result);
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de pessoas"
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