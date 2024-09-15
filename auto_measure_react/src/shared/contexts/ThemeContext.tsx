import { Box, ThemeProvider } from '@mui/material';
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';


interface IThemeContextData {
	themeName: 'light' | 'dark';
	toggleTheme: () => void;
}

interface IThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {

  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'dark' ? 'light' : 'dark');
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'dark') return DarkTheme;
    return LightTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

