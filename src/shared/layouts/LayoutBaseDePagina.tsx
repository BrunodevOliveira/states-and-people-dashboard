import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm")); //Retorna true caso o tamanho da tela seja menor que sm
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(12)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        {/*Typography-> define uma fonte e estilo padrão do MUI */}
        <Typography variant="h5">{titulo}</Typography>
      </Box>
      <Box>Barra de ferramentas</Box>
      <Box>{children}</Box> {/* Ocupa todo o espaço disponível*/}
    </Box>
  );
};
