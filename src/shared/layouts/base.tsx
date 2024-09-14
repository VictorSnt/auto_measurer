import { Header } from '../components/Header';
import { Box } from '@mui/material';
import React from 'react';
import { PaperBackground } from '../components/PaperBackground';

export interface ILayoutBaseProps {
  title: string;
  children: React.ReactNode;
  animation?: any;
}

export const LayoutBase:
  React.FC<ILayoutBaseProps> = ({ children, title, animation }) => {
    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{ padding: { xs: '10px', md: '0' } }}
        >
          <Box width="100%" sx={{ position: 'fixed', top: 0, zIndex: 1 }}>
            <Header title={title} />
          </Box>

          <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            <PaperBackground animation={animation}>
              {children}
            </PaperBackground>
          </Box>
        </Box>
      </>
    );
  };