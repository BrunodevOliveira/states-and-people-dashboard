import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"

interface IFerramentasDaListagemProps {
  textoDaBusca?: string
  mostrarInputBusca?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  textoBotaoNovo?: string
  mostrarBotaoNovo?: boolean
  aoClicarEmNovo?: () => void
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  aoClicarEmNovo,
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder="Pesquisar.."
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  )
}
