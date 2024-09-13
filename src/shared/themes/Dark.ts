import { createTheme } from '@mui/material';
import { teal, orange, deepPurple, red, grey } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      dark: teal[800],
      light: teal[300],
      contrastText: '#ffffff',
    },
    secondary: {
      main: orange[500],
      dark: orange[800],
      light: orange[300],
      contrastText: '#ffffff',
    },
    error: {
      main: red[500],
    },
    warning: {
      main: deepPurple[700],
    },
    background: {
      paper: '#212121',
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: grey[500],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: teal[400],
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: teal[300],
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: teal[200],
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: grey[300],
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: grey[400],
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: teal[500],
          '&:hover': {
            backgroundColor: teal[800],
          },
        },
        containedSecondary: {
          backgroundColor: orange[500],
          '&:hover': {
            backgroundColor: orange[800],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: teal[500],
        },
        colorSecondary: {
          backgroundColor: orange[500],
        },
      },
    },
  },
});
