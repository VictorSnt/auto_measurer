import Paper from '@mui/material/Paper';
import { LazyLottieAnimation } from './LazyLotiteAnimation';
import React from 'react';

export interface IPaperBgProps {
  children: React.ReactNode;
  animation: any;
}

export const PaperBackground: React.FC<IPaperBgProps> = ({ children, animation }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '90%', md: '80%' },
        height: { xs: 'auto', md: '80%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: 2, md: 0 },
      }}
    >
      {animation &&
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        >

          <LazyLottieAnimation
            animationData={animation}
          />

        </div>
      }
      {children}
    </Paper>
  );
};