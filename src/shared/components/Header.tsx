import iconAnimation from '../../assets/animations/iconAnimation.json';
import { useAppThemeContext } from '../contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Lottie from 'lottie-react';
import React from 'react';

export interface IHeaderProps {
  title: string;
}

const linkStyles = {
  color: '#fff',
  padding: '8px 16px',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0 16px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: '#0f79eb',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
  '&:active': {
    backgroundColor: '#0074ef',
  },
};

const ThemeToggleButton = styled(IconButton)`
  transition: transform 0.3s ease;
  &:hover {
    transform: rotate(20deg);
  }
`;

export const Header: React.FC<IHeaderProps> = ({ title }) => {
  const { themeName, toggleTheme } = useAppThemeContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <RouterLink to="/home">
              <Lottie
                animationData={iconAnimation}
                style={{ width: '60px', height: '30px' }}
              />
            </RouterLink>
          </IconButton>


          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            {title}
          </Typography>


          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link
              href="/home"
              sx={linkStyles}
            >
              Pagina inicial
            </Link>
            <Link
              href="/listagem"
              sx={linkStyles}
            >
              Listagem de medidas
            </Link>
          </Box>


          <ThemeToggleButton onClick={toggleTheme} color="inherit">
            {themeName === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </ThemeToggleButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};