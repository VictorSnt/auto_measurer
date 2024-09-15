import Lottie from 'lottie-react';
import React from 'react';
import Typography from '@mui/material/Typography';

interface LoadingAnimationProps {
  showLoading: boolean;
  loadingAnimation: any;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ showLoading, loadingAnimation }) => {
  return (
    <>
      {showLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            style={{
              color: '#fff',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Nosso assitente virtual esta analisando sua imagem...
          </Typography>
          <Lottie
            animationData={loadingAnimation}
            style={{ width: '75%', height: '75%' }}
          />
        </div>
      )}
    </>
  );
};
