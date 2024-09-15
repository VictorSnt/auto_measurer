import { Button, Box } from '@mui/material';

interface FilterButtonsProps {
  filterType: 'ALL' | 'WATER' | 'GAS';
  setFilterType: (type: 'ALL' | 'WATER' | 'GAS') => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ filterType, setFilterType }) => (
  <Box sx={{ marginBottom: '20px' }}>
    <Button
      variant={filterType === 'ALL' ? 'contained' : 'outlined'}
      onClick={() => setFilterType('ALL')}
    >
      Todas
    </Button>
    <Button
      variant={filterType === 'WATER' ? 'contained' : 'outlined'}
      onClick={() => setFilterType('WATER')}
      sx={{ marginLeft: '8px' }}
    >
      Água
    </Button>
    <Button
      variant={filterType === 'GAS' ? 'contained' : 'outlined'}
      onClick={() => setFilterType('GAS')}
      sx={{ marginLeft: '8px' }}
    >
      Gás
    </Button>
  </Box>
);

export default FilterButtons;
