import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useAppThemeContext } from '../contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Lottie from 'lottie-react';
import iconAnimation from '../../assets/animations/iconAnimation.json';
import { Divider, Link } from '@mui/material';

export interface IHeaderProps {
  title: string;
}

const linkStyles = (active: boolean) => ({
  color: '#333',  
  padding: '12px 24px',
  borderRadius: 8,
  fontWeight: 'bold',
  margin: '8px 0',
  transition: 'all 0.3s ease',
  backgroundColor: active ? '#e3f2fd' : 'transparent',
  textDecoration: active ? 'underline' : 'none',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: '#b3e5fc', 
  },
  '&:active': {
    backgroundColor: '#81d4fa',
  },
});

const ThemeToggleButton = styled(IconButton)`
  transition: transform 0.3s ease;
  &:hover {
    transform: rotate(20deg);
  }
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #3f51b5;
  color: #fff; // White text color
`;

const DrawerList = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <List>
      <ListItem button component={RouterLink} to="/home" onClick={toggleDrawer}>
        <ListItemText primary="Realizar leituras" sx={linkStyles(currentPath === '/home')} />
      </ListItem>
      <ListItem button component={RouterLink} to="/listagem" onClick={toggleDrawer}>
        <ListItemText primary="Historico de Leituras" sx={linkStyles(currentPath === '/listagem')} />
      </ListItem>
    </List>
  );
};

export const Header: React.FC<IHeaderProps> = ({ title }) => {
  const { themeName, toggleTheme } = useAppThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
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
            <Link href="/home" sx={linkStyles(location.pathname === '/home')}>
              Realizar leituras
            </Link>
            <Link href="/listagem" sx={linkStyles(location.pathname === '/listagem')}>
              Historico de Leituras
            </Link>
          </Box>

          <ThemeToggleButton onClick={toggleTheme} color="inherit">
            {themeName === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </ThemeToggleButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <DrawerHeader>
          <Typography variant="h6">Escolha uma opção</Typography>
        </DrawerHeader>
        <Divider />
        <DrawerList toggleDrawer={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
};
