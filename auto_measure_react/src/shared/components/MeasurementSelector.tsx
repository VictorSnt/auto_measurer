import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import GasMeterIcon from '@mui/icons-material/GasMeter';


const StyledButton = styled(Button)(() => ({
  borderRadius: '25px',
  padding: '10px 20px',
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
  },
}));

interface MeasurementSelectorProps {
  isWater: boolean;
  onChange: (type: boolean) => void;
}

export const MeasurementSelector: React.FC<MeasurementSelectorProps> = ({ isWater, onChange }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom="20px"
      gap="15px"
    >
      <StyledButton
        variant={isWater ? 'contained' : 'outlined'}
        onClick={() => onChange(true)}
        sx={{
          background: isWater ?
            'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)' : 'transparent',
          border: isWater ? 'none' : '2px solid #0288d1',
          color: isWater ? '#fff' : '#0288d1',
        }}
        startIcon={<WaterIcon />}
      >
        Água
      </StyledButton>

      <StyledButton
        variant={!isWater ? 'contained' : 'outlined'}
        onClick={() => onChange(false)}
        sx={{
          background: !isWater ?
            'linear-gradient(135deg, #81c784 0%, #388e3c 100%)' : 'transparent',
          border: !isWater ? 'none' : '2px solid #388e3c',
          color: !isWater ? '#fff' : '#388e3c',
        }}
        startIcon={<GasMeterIcon />}
      >
        Gás
      </StyledButton>
    </Box>
  );
};
