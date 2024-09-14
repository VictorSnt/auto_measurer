import React, { useEffect, useRef, useState } from 'react';
import { LayoutBase } from '../shared/layouts/base';
import { MeasureService } from '../shared/services/measureService';
import { Base64Service } from '../shared/services/base64Service';
import { MeasurementSelector } from '../shared/components/MeasurementSelector';
import { ExampleImage } from '../shared/components/ExampleImage';
import { FileUploader } from '../shared/components/FileUploader';
import { MeasurementResult } from '../shared/components/MeasurementResult';


export const HomePage: React.FC = () => {
  const [isWater, setIsWater] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [measure, setMeasure] = useState<any | null>(null);
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
        customer_code: 'string1',
        measure_datetime: new Date(),
        measure_type: isWater ? 'WATER' : 'GAS'
      };
      const service = new MeasureService(payload);
      try {
        const response = await service.getMeasure();
        setMeasure(response);
      } catch (error: any) {
        alert(error.message);
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
          <MeasurementResult file={file!} measure={measure} />
        )}
      </div>
    </LayoutBase>
  );
};