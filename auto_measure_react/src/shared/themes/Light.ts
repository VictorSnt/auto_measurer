import { createTheme } from '@mui/material';
import { indigo, pink, red, orange, grey } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      dark: indigo[800],
      light: indigo[300],
      contrastText: '#ffffff',
    },
    secondary: {
      main: pink[500],
      dark: pink[800],
      light: pink[300],
      contrastText: '#ffffff',
    },
    error: {
      main: red[500],
    },
    warning: {
      main: orange[700],
    },
    background: {
      paper: '#f5f5f5',
      default: '#fffff',
    },
    text: {
      primary: '#333333',
      secondary: grey[600],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: indigo[500],
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: indigo[400],
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: indigo[300],
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: grey[800],
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: grey[600],
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
          backgroundColor: indigo[500],
          '&:hover': {
            backgroundColor: indigo[800],
          },
        },
        containedSecondary: {
          backgroundColor: pink[500],
          '&:hover': {
            backgroundColor: pink[800],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: indigo[500],
        },
        colorSecondary: {
          backgroundColor: pink[500],
        },
      },
    },
  },
});
