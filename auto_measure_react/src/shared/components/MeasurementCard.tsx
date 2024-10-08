import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, TextField, IconButton } from '@mui/material';
import { Measurement } from '../services/measureServiceInterfaces';
import { ImgStorageService } from '../services/imgStorageService';
import ZoomIn from '@mui/icons-material/ZoomIn';

interface MeasurementCardProps {
  measurement: Measurement;
  showConfirmOverlay: CallableFunction;
  onImageClick: (imageUrl: string) => void;
}

export const MeasurementCard: React.FC<MeasurementCardProps> = ({
  measurement,
  showConfirmOverlay,
  onImageClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          sx={{ height: 140, backgroundSize: 'cover', cursor: 'pointer' }}
          image={ImgStorageService.getImage(measurement)}
          title={`Imagem da medição ${measurement.measure_uuid}`}
          onClick={() => onImageClick(ImgStorageService.getImage(measurement))}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '50%',
            padding: 1,
          }}
          onClick={() => onImageClick(ImgStorageService.getImage(measurement))}
        >
          <ZoomIn />
        </IconButton>
      </Box>
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
              onClick={() => showConfirmOverlay(measurement.measure_uuid)}
            >
              Confirmar Medida
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};