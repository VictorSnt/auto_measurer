import { useCallback, useEffect, useState } from 'react';
import { LayoutBase } from '../shared/layouts/base';
import { Measurement } from '../shared/services/measureServiceInterfaces';
import { ListCustomerMesures } from '../shared/services/measureService';
import { Toaster } from '../shared/services/notificationService';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import { ConfirmMeasureUsecase } from '../usecase/confirmMeasureUseCase';

export const MeasureListage: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingMeasurement, setEditingMeasurement] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const toaster = new Toaster();

  const loadMeasurements = useCallback(async () => {
    const measurementsLister = new ListCustomerMesures();
    try {
      const response = await measurementsLister.getMeasures('str1');
      if (response) {
        setMeasurements(response.measures);
      }
    } catch (error: any) {
      console.error(error);
      toaster.notify.error(
        'Oops', error instanceof Error ?
        error.message :
        'Ocorreu um erro inesperado'
      );
      setError(error.message);
    }
  }, [toaster]);

  useEffect(() => {
    loadMeasurements();
  }, [loadMeasurements]);

  const handleConfirmClick = (measurementUuid: string) => {
    setEditingMeasurement(measurementUuid);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleConfirmMeasurement = async (measurementUuid: string) => {
    const confirmMeasure = new ConfirmMeasureUsecase();
    try {
      await confirmMeasure.execute(measurementUuid, inputValue);
      setEditingMeasurement(null);
      setInputValue('');
      await loadMeasurements();
    } catch (error: any) {
      console.error(error);
      toaster.notify.error(
        'Oops', error instanceof Error ?
        error.message : 'Ocorreu um erro inesperado'
      );
    }
  };

  return (
    <LayoutBase title="Medição">
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        {measurements.length === 0 ? (
          <Typography variant="body1">Nenhuma medição encontrada.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {measurements.map(measurement => (
              <Card key={measurement.measure_uuid} sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ height: 140, backgroundSize: 'cover' }}
                  image={measurement.image_url}
                  title={`Imagem da medição ${measurement.measure_uuid}`}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {measurement.measure_type === 'WATER' ? 'Água' : 'Gás'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data: {new Date(measurement.measure_datetime).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Confirmado: {measurement.has_confirmed ? 'Sim' : 'Não'}
                  </Typography>
                </CardContent>
                <CardActions>
                  {!measurement.has_confirmed && (
                    <>
                      <Button size="small" onClick={() => handleConfirmClick(measurement.measure_uuid)}>
                        Confirmar Medida
                      </Button>
                      {editingMeasurement === measurement.measure_uuid && (
                        <Box sx={{ marginTop: '16px' }}>
                          <TextField
                            fullWidth
                            label="Digite o valor"
                            variant="outlined"
                            value={inputValue}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '8px' }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleConfirmMeasurement(measurement.measure_uuid)}
                          >
                            Confirmar
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </LayoutBase>
  );
};
