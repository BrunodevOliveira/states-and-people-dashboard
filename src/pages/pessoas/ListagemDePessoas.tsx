import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableFooter,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
} from "@mui/material";

import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Enviroment } from "../../shared/environment";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //Parecido com o state, mas com ele podemos enviar os dados pesquisados para a url
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0); //guarda o total de registros do BD
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || ""; //retorna o texto salvo na chave "busca" que foi passado no setSearchParams
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1"); //Precisa ser number para que seja aceito no componente de paginação
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        //essa verificação é melhor que catch pois com ela aproveitamos o tipo que result possui
        if (result instanceof Error) return alert(result.message);

        console.log(result);
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [busca, debounce, pagina]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      //confirm-> pergunta ao usuário se confirma que quer apagar o registro e retorna um booleano
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso");
          setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
        }
      });
    }
  };

  function renderRowTable(data: IListagemPessoa) {
    return (
      <TableRow key={data.id}>
        <TableCell>
          <IconButton size="small" onClick={() => handleDelete(data.id)}>
            <Icon>delete</Icon>
          </IconButton>
          <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${data.id}`)}>
            <Icon>edit</Icon>
          </IconButton>
        </TableCell>
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
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
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
          {totalCount === 0 && !isLoading && <caption>{Enviroment.LISTAGEM_VAZIA}</caption>}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > Enviroment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                    onChange={
                      (_, newPage) =>
                        setSearchParams({ busca, pagina: newPage.toString() }, { replace: true }) //replace-> guarda o histórico de navegação entre as páginas
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
