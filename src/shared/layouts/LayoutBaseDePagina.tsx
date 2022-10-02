import { Icon, IconButton, Typography, useMediaQuery, useTheme, Theme } from "@mui/material"
import { Box } from "@mui/system"
import { useDrawerContext } from "../contexts"

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode
  titulo: string
  barraDeFerramentas?: React.ReactNode
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
  barraDeFerramentas,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm")) //Retorna true caso o tamanho da tela seja menor que sm
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md")) //Retorna true caso o tamanho da tela seja menor que md
  const theme = useTheme()

  const { toggleDrawerOpen } = useDrawerContext()

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        {/*Typography-> define uma fonte e estilo padrão do MUI */}
        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipses"
        >
          {titulo}
        </Typography>
      </Box>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>{" "}
      {/* Ocupa todo o espaço disponível*/}
    </Box>
  )
}
