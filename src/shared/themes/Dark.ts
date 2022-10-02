import { createTheme } from "@mui/material"
import { yellow, cyan } from "@mui/material/colors"

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    background: {
      default: "#202124",
      paper: "#303134",
    },
  },
  typography: {
    //Aplica as configs para todas as tags de typography
    allVariants: {
      //Aplica para todas as variações da tag typography
      color: "white", //Altera a cor dos elementos da tag quando o tema é trocado
    },
  },
})
