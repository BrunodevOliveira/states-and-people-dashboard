import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //Parecido com o state, mas com ele podemos enviar os dados pesquisados para a url
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0); //guarda o total de registros do BD
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || ""; //retorna o texto salvo na chave "busca" que foi passado no setSearchParams
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        //essa verificação é melhor que catch pois com ela aproveitamos o tipo que result possui
        if (result instanceof Error) return alert(result.message);

        console.log(result);
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [busca, debounce]);

  function renderRowTable(data: IListagemPessoa) {
    return (
      <TableRow key={data.id}>
        <TableCell>Ações</TableCell>
        <TableCell>{data.nomeCompleto}</TableCell>
        <TableCell>{data.email}</TableCell>
      </TableRow>
    );
  }

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
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows.map(renderRowTable)}</TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
