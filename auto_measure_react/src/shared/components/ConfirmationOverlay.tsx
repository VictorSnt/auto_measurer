import { Box, TextField, Typography, Button } from '@mui/material';
import React from 'react';

interface ConfirmationOverlayProps {
  isOverlayVisible: boolean;
  confirmationValue: string;
  handleConfirmationValueChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleConfirmMeasurement: () => void;
  handlerOverlayVisible: (visible: boolean) => void;
}

export const ConfirmationOverlay: React.FC<ConfirmationOverlayProps> = ({
  isOverlayVisible,
  confirmationValue,
  handleConfirmationValueChange,
  handleConfirmMeasurement,
  handlerOverlayVisible
}) => {
  if (!isOverlayVisible) return null;


  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handlerOverlayVisible(false);
  };

  
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={handleOverlayClick}
    >
      <Box
        className="overlay-content"
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: 3,
          maxWidth: '500px',
          width: '100%',
        }}
        onClick={handleContentClick}
      >
        <Typography variant="h6" gutterBottom>
          Confirmar Medida
        </Typography>
        <TextField
          fullWidth
          label="Digite o valor"
          variant="outlined"
          value={confirmationValue}
          onChange={handleConfirmationValueChange}
          sx={{ marginBottom: '16px' }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleConfirmMeasurement}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};
