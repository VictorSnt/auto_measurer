import React, { useState } from 'react';
import { CreateMeasurePayloadResponse } from '../services/measureServiceInterfaces';
import { ConfirmMeasureUsecase } from '../../usecase/confirmMeasureUseCase';
import { measureResultStyles } from '../styles/measurementResultStyles';

interface MeasurementResultProps {
  file: File | null;
  measure: CreateMeasurePayloadResponse;
}

export const MeasurementResult: React.FC<MeasurementResultProps> = ({ file, measure }) => {
  const [confirmationValue, setConfirmationValue] = useState<string>('');
  const confirmatinUsecase = new ConfirmMeasureUsecase();


  const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationValue(event.target.value);
  };

  async function confirmMeasure() {
    const originalValue = measure.measure_value;
    const measureValue = (
      confirmationValue === '' ?
        originalValue :
        confirmationValue
    );

    await confirmatinUsecase.execute(
      measure.measure_uuid,
      measureValue
    );
    window.location.reload();
  }

  async function abortConfirmation() {
    await ConfirmMeasureUsecase.handleCancel();
  }

  return (
    <div style={measureResultStyles.containerStyle}>
      {file ? (
        <>
          <h2 style={measureResultStyles.titleStyle}>Foto do Medidor:</h2>
          <div style={measureResultStyles.imageContainerStyle}>
            <img src={URL.createObjectURL(file)}
              alt="Foto do Medidor"
              style={measureResultStyles.imageStyle}
            />
          </div>
          <div style={measureResultStyles.measureContainerStyle}>
            <h1 style={measureResultStyles.measureTitleStyle}>Medida:</h1>
            <span style={measureResultStyles.measureValueStyle}>{measure.measure_value}</span>
          </div>
          <div style={measureResultStyles.confirmationContainerStyle}>
            <input
              type="text"
              value={confirmationValue}
              onChange={handleConfirmationChange}
              placeholder="Corrija a medição se necessario"
              style={measureResultStyles.inputStyle}
            />
            <div style={measureResultStyles.buttonContainerStyle}>
              <button onClick={confirmMeasure} style={measureResultStyles.confirmButtonStyle}>Confirmar</button>
              <button onClick={abortConfirmation} style={measureResultStyles.cancelButtonStyle}>Cancelar</button>
            </div>
          </div>
        </>
      ) : (
        <h1>Erro inesperado</h1>
      )}
    </div>
  );
};
