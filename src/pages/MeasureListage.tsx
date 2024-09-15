import React, { useCallback, useEffect, useState } from 'react';
import { LayoutBase } from '../shared/layouts/base';
import { Measurement } from '../shared/services/measureServiceInterfaces';
import { ListCustomerMesures } from '../shared/services/measureService';
import { Toaster } from '../shared/services/notificationService';
import { Box, Typography, Button, TextField } from '@mui/material';
import { ConfirmMeasureUsecase } from '../usecase/confirmMeasureUseCase';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MeasurementCard } from '../shared/components/MeasurementCard';
import { ImageViewer } from '../shared/components/ImageViewer';



export const MeasureListage: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingMeasurement, setEditingMeasurement] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'WATER' | 'GAS'>('ALL');
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State for the image URL to display

  const toaster = new Toaster();

  const loadMeasurements = useCallback(async (type: 'ALL' | 'WATER' | 'GAS') => {
    const measurementsLister = new ListCustomerMesures();
    try {
      const response = await measurementsLister.getMeasures(
        'str3',
        type === 'ALL' ? false : `?measure_type=${type}`
      );
      if (response) {
        setMeasurements(response.measures);
      }
    } catch (error: any) {
      console.error(error);
      toaster.notify.error('Oops', error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
      setError(error.message);
    }
  }, [toaster]);

  useEffect(() => {
    loadMeasurements(filterType);
  }, [filterType, loadMeasurements]);

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
      await loadMeasurements(filterType);
    } catch (error: any) {
      console.error(error);
      toaster.notify.error('Oops', error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
    }
  };

  const handleImageClick = (url: string) => {
    setImageUrl(url);
  };

  const handleCloseImageViewer = () => {
    setImageUrl(null);
  };

  return (
    <LayoutBase title="Historico de Medições">
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Historico de Medições
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Visualize e confirme suas medições abaixo
        </Typography>
        {error && <Typography variant="body1" color="error">{error}</Typography>}

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

        {measurements.length === 0 ? (
          <Typography variant="body1">Nenhuma medição encontrada.</Typography>
        ) : (
          <SwiperComponent
            spaceBetween={16}
            slidesPerView="auto"
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            style={{ padding: '20px' }}
          >
            {measurements.map(measurement => (
              <SwiperSlide key={measurement.measure_uuid}>
                <MeasurementCard
                  measurement={measurement}
                  handleConfirmClick={handleConfirmClick}
                  editingMeasurement={editingMeasurement}
                  inputValue={inputValue}
                  handleInputChange={handleInputChange}
                  handleConfirmMeasurement={handleConfirmMeasurement}
                  onImageClick={handleImageClick} // Pass handler to card
                />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        )}
      </Box>

      {/* Render ImageViewer with current imageUrl */}
      <ImageViewer
        imageUrl={imageUrl ?? ''}
        isOpen={!!imageUrl}
        onClose={handleCloseImageViewer}
      />
    </LayoutBase>
  );
};
