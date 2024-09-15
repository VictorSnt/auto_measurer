import Lottie from 'lottie-react';
import React from 'react';

interface LoadingAnimationProps {
  showLoading: boolean
  loadingAnimation: any
}
export const LoadingAnimation:
  React.FC<LoadingAnimationProps> = ({ showLoading, loadingAnimation }) => {
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
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
            }}
          >
            <Lottie
              animationData={loadingAnimation}
              style={{ width: '75%', height: '75%' }}
            />
          </div>
        )}
      </>
    );
  };