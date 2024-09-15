import { Box, TextField, Typography, Button } from '@mui/material';

interface ConfirmationOverlayProps {
  isOverlayVisible: boolean;
  confirmationValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmMeasurement: () => void;
  setOverlayVisible: (visible: boolean) => void;
}

const ConfirmationOverlay: React.FC<ConfirmationOverlayProps> = ({
  isOverlayVisible,
  confirmationValue,
  handleInputChange,
  handleConfirmMeasurement,
  setOverlayVisible,
}) => {
  if (!isOverlayVisible) return null;

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
      >
        <Typography variant="h6" gutterBottom>
          Confirmar Medida
        </Typography>
        <TextField
          fullWidth
          label="Digite o valor"
          variant="outlined"
          value={confirmationValue}
          onChange={handleInputChange}
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

export default ConfirmationOverlay;
