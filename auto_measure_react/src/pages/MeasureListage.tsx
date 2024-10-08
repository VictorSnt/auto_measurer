import React, { useEffect, useState } from 'react';
import { LayoutBase } from '../shared/layouts/base';
import { Measurement } from '../shared/services/measureServiceInterfaces';
import { ListCustomerMesures } from '../shared/services/measureService';
import { Toaster } from '../shared/services/notificationService';
import { Box, Typography, Button } from '@mui/material';
import { ConfirmMeasureUsecase } from '../usecase/confirmMeasureUseCase';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MeasurementCard } from '../shared/components/MeasurementCard';
import { ImageViewer } from '../shared/components/ImageViewer';
import { ConfirmationOverlay } from '../shared/components/ConfirmationOverlay';


export const MeasureListage: React.FC = () => {

  const [confirmationValue, setconfirmationValue] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [filterType, setFilterType] = useState<'ALL' | 'WATER' | 'GAS'>('ALL');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [editingMeasurement, setEditingMeasurement] = useState<string | null>(null);

  const toaster = new Toaster();

  const loadMeasurements = async (type: 'ALL' | 'WATER' | 'GAS') => {
    const measurementsLister = new ListCustomerMesures();
    const customerId = localStorage.getItem('customerId') || 'willGet404';
    
    try {
      const response = await measurementsLister.getMeasures(
        customerId,
        type === 'ALL' ? false : `?measure_type=${type}`
      );

      if (response && response.measures) {
        setMeasurements(response.measures);
      } else {
        setMeasurements([]);
      }
    } catch (error: unknown) {
      setMeasurements([]);
      const errorMsg = (
        error instanceof Error ?
          error.message :
          'Ocorreu um erro inesperado'
      );
      toaster.notify.error('Oops', errorMsg);
    }
  };

  useEffect(() => {
    loadMeasurements(filterType);
  }, [filterType]);

  const handleConfirmationValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmationValue(event.target.value);
  };

  const handleConfirmMeasurement = async () => {
    const confirmMeasure = new ConfirmMeasureUsecase();
    if (!editingMeasurement) return;
    try {
      await confirmMeasure.execute(editingMeasurement, confirmationValue);
      setconfirmationValue('');
      await loadMeasurements(filterType);
    } catch (error: any) {
      toaster.notify.error(
        'Oops', error instanceof Error ?
          error.message :
          'Ocorreu um erro inesperado'
      );
    } finally {
      setShowConfirmation(false);
      setEditingMeasurement(null);
    }
  };

  const handleImageClick = (url: string) => {
    setImageUrl(url);
  };

  const handleCloseImageViewer = () => {
    setImageUrl(null);
  };


  const handlerConfirmationOverlay = (uuid: string) => {
    setEditingMeasurement(uuid);
    setShowConfirmation(true);
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
          <Typography color="error" variant="body1">Nenhuma medição encontrada.</Typography>
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
                  showConfirmOverlay={handlerConfirmationOverlay}
                  onImageClick={handleImageClick}
                />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        )}
      </Box>

      <ConfirmationOverlay
        isOverlayVisible={showConfirmation}
        confirmationValue={confirmationValue} 
        handleConfirmationValueChange={handleConfirmationValueChange} 
        handleConfirmMeasurement={handleConfirmMeasurement}
        handlerOverlayVisible={setShowConfirmation}
      />
      <ImageViewer
        imageUrl={imageUrl ?? ''}
        isOpen={!!imageUrl}
        onClose={handleCloseImageViewer}
      />
    </LayoutBase>
  );
};
