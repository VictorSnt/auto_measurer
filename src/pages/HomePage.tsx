import React, { useEffect, useRef, useState } from 'react';
import { LayoutBase } from '../shared/layouts/base';
import { MeasurementSelector } from '../shared/components/MeasurementSelector';
import { ExampleImage } from '../shared/components/ExampleImage';
import { FileUploader } from '../shared/components/FileUploader';
import { MeasurementResult } from '../shared/components/MeasurementResult';
import { CreateMeasurePayloadResponse } from '../shared/services/measureServiceInterfaces';
import { CreateMeasureUseCase } from '../usecase/createMeasureUseCase';
import { Toaster } from '../shared/services/notificationService';


export const HomePage: React.FC = () => {
  const [isWater, setIsWater] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [measure, setMeasure] = useState<CreateMeasurePayloadResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (type: boolean) => {
    setIsWater(type);
    setFile(null);
    setMeasure(null);
  };

  useEffect(() => {
    if (file) {
      const usecasePayload = {
        measure_type: isWater ? 'WATER' : 'GAS',
        file: file,
        responseSetter: setMeasure,
      };
      CreateMeasureUseCase.execute(usecasePayload)
        .catch(error => {
          const toaster = new Toaster();
          console.error(error);
          if (error instanceof Error) {
            toaster.notify.error('Opps', error.message);
          } else {
            toaster.notify.error('Opps', 'Ocorreu um erro inesperado');
          }
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        });
    }
  }, [file, isWater]);

  return (
    <LayoutBase title='Medição'>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {!measure ? (
          <>
            <h1>Escolha o Tipo de Medição</h1>
            <MeasurementSelector isWater={isWater} onChange={handleChange} />
            <ExampleImage isWater={isWater} />
            <FileUploader onFileChange={setFile} fileInputRef={fileInputRef} />
          </>
        ) : (
          <MeasurementResult file={file} measure={measure} />
        )}
      </div>
    </LayoutBase>
  );
};