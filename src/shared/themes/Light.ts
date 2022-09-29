import { createTheme } from "@mui/material";
import { yellow, cyan } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700], //cor principal
      dark: yellow[800], //hover da cor promaria
      light: yellow[500],
      contrastText: "#ffffff", //aplica contraste a cor primária
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff", //aplica contraste a cor primária
    },
    background: {
      default: "#f7f6f3", //usado no fundo da página
      paper: "#ffffff", // usado dentro de card (containers)
    },
  },
});
