import React, { useEffect, useRef, useState } from 'react';
import { LayoutBase } from '../shared/layouts/base';

import { Base64Service } from '../shared/services/base64Service';
import { MeasurementSelector } from '../shared/components/MeasurementSelector';
import { ExampleImage } from '../shared/components/ExampleImage';
import { FileUploader } from '../shared/components/FileUploader';
import { MeasurementResult } from '../shared/components/MeasurementResult';
import { CreateMeasurePayloadResponse } from '../shared/services/measureServiceInterfaces';
import { CreateMeasureService } from '../shared/services/measureService';


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
    const transformFile = async (file: File) => {
      const payload = {
        image: await Base64Service.convertToBase64(file),
        customer_code: 'string45',
        measure_datetime: new Date(),
        measure_type: isWater ? 'WATER' : 'GAS'
      };
      const service = new CreateMeasureService(payload);
      try {
        const response = await service.getMeasure();
        setMeasure(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unknown error occurred');
        }
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    if (file) {
      transformFile(file);
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