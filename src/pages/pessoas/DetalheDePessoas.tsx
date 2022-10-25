import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VtextField } from "../../shared/forms";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">(); // Dessa forma obtenho a variável id da rota (tipo o useParams com a var que qeuro extrair da rota)
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null); //Com essa referência posso dar submit no formulário através da ferramenta de detalhes

  const [isloading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          formRef.current?.setData(result); //seta os inputs com os ddados da pessoa
        }
      });
    }
  }, [id, navigate]);

  const handleSave = (dados: IFormData) => {
    //Aqui eu trato os dados para que sejam salvos no BD
    setIsLoading(true);
    if (id === "nova") {
      //se o Id for "nova" significa que estamos criando um novo cadastro
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) return alert(result.message);
        navigate(`/pessoas/detalhe/${result}`); //depois de criar o usuário o BD retorna o ID dele, com ele podemos redirecionar o usuário
      });
    } else {
      PessoasService.updateById(+id, { id: +id, ...dados }).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) return alert(result.message);
      });
    }
  };
  const handleDelete = (id: number) => {
    if (window.confirm(`Realmente deseja exlcuir ${nome}?`)) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert(`Registro de ${nome} apagado com sucesso!`);
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova pessoa" : `Detalhes de ${nome}`}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"} //mostra o botão de apagar somente quando for editar uma pessoa e não quando for cadastrar uma nova pessoa
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(+id)}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VtextField placeholder="Nome completo" name="nomeCompleto" />
        <VtextField placeholder="Email" name="email" />
        <VtextField placeholder="Id da cidade" name="cidadeId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
