import React from 'react';
import { 
  Card, CardActions, CardContent, 
  CardMedia, Button, Typography, 
  Box, TextField 
} from '@mui/material';
import { Measurement } from '../services/measureServiceInterfaces';
import { ImgStorageService } from '../services/imgStorageService';


interface MeasurementCardProps {
  measurement: Measurement;
  handleConfirmClick: (measurementUuid: string) => void;
  editingMeasurement: string | null;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmMeasurement: (measurementUuid: string) => void;
  onImageClick: (imageUrl: string) => void;
}

export const MeasurementCard: React.FC<MeasurementCardProps> = ({
  measurement,
  handleConfirmClick,
  editingMeasurement,
  inputValue,
  handleInputChange,
  handleConfirmMeasurement,
  onImageClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{ height: 140, backgroundSize: 'cover', cursor: 'pointer' }}
        image={ImgStorageService.getImage(measurement)}
        title={`Imagem da medição ${measurement.measure_uuid}`}
        onClick={() => onImageClick(ImgStorageService.getImage(measurement))} 
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {measurement.measure_type === 'WATER' ? 'Água' : 'Gás'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data: {new Date(measurement.measure_datetime).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Confirmado:
          <span style={{
            color: measurement.has_confirmed ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
            {measurement.has_confirmed ? ' Sim' : ' Não'}
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        {!measurement.has_confirmed && (
          <>
            <Button
              size="small"
              onClick={() => handleConfirmClick(measurement.measure_uuid)}
            >
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
                  variant="outlined"
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
  );
};