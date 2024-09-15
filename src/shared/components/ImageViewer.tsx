import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageViewerProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, isOpen, onClose }) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.image-viewer-content')) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}
    >
      <Box
        className="image-viewer-content"
        sx={{
          position: 'relative',
          maxWidth: '80%',  // Adjusted width
          maxHeight: '80%', // Adjusted height
          overflow: 'hidden',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'white',
            zIndex: 1,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <img
          src={imageUrl}
          alt="Imagem Grande"
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
};
