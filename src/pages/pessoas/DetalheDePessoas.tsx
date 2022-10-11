import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">(); // Dessa forma obtenho a variável id da rota (tipo o useParams com a var que qeuro extrair da rota)
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Save");
  };
  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <LayoutBaseDePagina
      titulo="Detalhe de pessoa"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"} //mostra o botão de apagar somente quando for editar uma pessoa e não quando for cadastrar uma nova pessoa
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={handleDelete}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <p>DetalheDePessoas {id}</p>
    </LayoutBaseDePagina>
  );
};
