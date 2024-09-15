import React, { Suspense, useEffect, useState } from 'react';

const Lottie = React.lazy(() => import('lottie-react'));

export const LazyLottieAnimation: React.FC<{animationData: any}> = ({ animationData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('lottie-container');
      if (element && element.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="lottie-container">
      {isVisible && (
        <Suspense fallback={<div>Loading...</div>}>
          <Lottie
            animationData={animationData}
            style={{ width: '100%' }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice',
              progressiveLoad: true,
            }}
          />
        </Suspense>
      )}
    </div>
  );
};