import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "./../themes";
import { Box } from "@mui/system";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

//^1° Crio o contexto que será compartilhado
const ThemeContext = createContext({} as IThemeContextData);

//^3° Hook criado para consumir o contexto criado em cada componente
export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

interface IThemeProviderProps {
  children: React.ReactNode;
}
//^ 2° Método que fornece os dados retornados para toda aplicação em App.tsx
export const AppThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  // Toda vez que o tema for alterado essa função será executada
  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
