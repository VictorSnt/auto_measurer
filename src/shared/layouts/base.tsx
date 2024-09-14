import { Header } from '../components/Header';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import { PaperBackground } from '../components/PaperBackground';
import { motion } from 'framer-motion';

export interface ILayoutBaseProps {
  title: string;
  children: React.ReactNode;
  animation?: any;
}

export const LayoutBase:
  React.FC<ILayoutBaseProps> = ({ children, title, animation }) => {
    const theme = useTheme();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{
            padding: { xs: '10px', md: '0' },
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 
              30%, ${theme.palette.background.default} 100%)`,
            overflow: 'hidden',
          }}
        >

          <Box
            width="100%"
            sx={{
              position: 'fixed',
              top: 0,
              zIndex: 1,
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Header title={title} />
          </Box>


          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '60px',
              paddingBottom: '20px',
            }}
          >
            <PaperBackground animation={animation}>
              {children}
            </PaperBackground>
          </Box>

          <Box
            width="100%"
            sx={{
              position: 'fixed',
              bottom: 0,
              zIndex: 1,
              textAlign: 'center',
              padding: '10px 0',
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px -4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <small>&copy; {new Date().getFullYear()} Victor Santos</small>
          </Box>
        </Box>
      </motion.div>
    );
  };
