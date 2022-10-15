import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Form } from "@unform/web";
import { VtextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">(); // Dessa forma obtenho a variável id da rota (tipo o useParams com a var que qeuro extrair da rota)
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null); //Com essa referência posso dar submit no formulário através da ferramenta de detalhes

  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      // setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        // setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          console.log(result);
          setNome(result.nomeCompleto);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = (dados: IFormData) => {
    //Aqui eu trato os dados para que sejam salvos no BD
    console.log(dados);
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
        <VtextField name="nomeCompleto" />
        <VtextField name="email" />
        <VtextField name="cidadeId" />

        <button type="submit">Enviar</button>
      </Form>
    </LayoutBaseDePagina>
  );
};
