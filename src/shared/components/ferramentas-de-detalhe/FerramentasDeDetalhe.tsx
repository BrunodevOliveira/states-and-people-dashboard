import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Theme } from "@mui/system"

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string

  mostrarBotaoNovo?: boolean
  mostrarBotaoVoltar?: boolean
  mostrarBotaoApagar?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoSalvarEFechar?: boolean

  mostrarBotaoNovoCarregando?: boolean
  mostrarBotaoVoltarCarregando?: boolean
  mostrarBotaoApagarCarregando?: boolean
  mostrarBotaoSalvarCarregando?: boolean
  mostrarBotaoSalvarEFecharCarregando?: boolean

  aoClicarEmNovo?: () => void
  aoClicarEmVoltar?: () => void
  aoClicarEmApagar?: () => void
  aoClicarEmSalvar?: () => void
  aoClicarEmSalvarEFechar?: () => void
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = false,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = true,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
  aoClicarEmApagar,
  aoClicarEmNovo,
  aoClicarEmVoltar,
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm")) //Retorna true caso o tamanho da tela seja menor que sm
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md")) //Retorna true caso o tamanho da tela seja menor que md

  const renderizar = {
    btnSalvar: mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando,
    btnSalvarEVoltar:
      mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown, //Só mostro esse botão se a tela for maior que MD
    btnApagar: mostrarBotaoApagar && !mostrarBotaoApagarCarregando,
    btnNovo: mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown,
    btnVoltar: mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando,
    divider:
      mostrarBotaoVoltar &&
      (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar),
  }

  return (
    <Box
      component={Paper}
      display="flex"
      alignItems="center"
      gap={1}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
    >
      {renderizar.btnSalvar && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {renderizar.btnSalvarEVoltar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          <Typography variant="button" noWrap>
            Salvar e voltar
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {renderizar.btnApagar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          <Typography variant="button" noWrap>
            Apagar
          </Typography>
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {renderizar.btnNovo && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          <Typography variant="button" noWrap>
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}

      {mostrarBotaoNovoCarregando && !smDown && <Skeleton width={110} height={60} />}

      {renderizar.divider && <Divider variant="middle" orientation="vertical" />}

      {renderizar.btnVoltar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>keyboard_return</Icon>}
          onClick={aoClicarEmVoltar}
        >
          <Typography variant="button" noWrap>
            Voltar
          </Typography>
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  )
}
