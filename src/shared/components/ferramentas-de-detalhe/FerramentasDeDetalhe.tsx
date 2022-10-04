import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material"

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string

  mostrarBotaoNovo?: boolean
  mostrarBotaoVoltar?: boolean
  mostrarBotaoApagar?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoSalvarEFechar?: boolean

  aoClicarEmNovo?: () => void
  aoClicarEmVoltar?: () => void
  aoClicarEmApagar?: () => void
  aoClicarEmSalvar?: () => void
  aoClicarEmSalvarEFechar?: () => void
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
  aoClicarEmApagar,
  aoClicarEmNovo,
  aoClicarEmVoltar,
}) => {
  const theme = useTheme()

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
      {mostrarBotaoSalvar && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          Salvar
        </Button>
      )}
      {mostrarBotaoSalvarEFechar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          Salvar e voltar
        </Button>
      )}
      {mostrarBotaoApagar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>
      )}
      {mostrarBotaoNovo && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>
      )}
      <Divider variant="middle" orientation="vertical" />
      {mostrarBotaoVoltar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>keyboard_return</Icon>}
          onClick={aoClicarEmVoltar}
        >
          Voltar
        </Button>
      )}
    </Box>
  )
}
