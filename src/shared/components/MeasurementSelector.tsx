import Button from '@mui/material/Button';

interface MeasurementSelectorProps {
  isWater: boolean;
  onChange: (type: boolean) => void;
}

export const MeasurementSelector: React.FC<MeasurementSelectorProps> = ({ isWater, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Button
        variant={isWater ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onChange(true)}
        style={{ margin: '0 10px' }}
      >
        Água
      </Button>
      <Button
        variant={!isWater ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onChange(false)}
        style={{ margin: '0 10px' }}
      >
        Gás
      </Button>
    </div>
  );
};
