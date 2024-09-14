import React, { useEffect, useState } from 'react';
import { ConfirmMeasurement, CreateMeasurePayloadResponse } from '../services/measureService';

interface MeasurementResultProps {
  file: File | null;
  measure: CreateMeasurePayloadResponse;
}

export const MeasurementResult:
  React.FC<MeasurementResultProps> = ({ file, measure }) => {
    const [confirmationValue, setConfirmationValue] = useState<string>('');
    const [triggerConfirmation, setTriggerConfirmation] = useState(false);

    const handleConfirmationChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setConfirmationValue(event.target.value);
    };

    const confirmMeasure = async () => {
      const payload = {
        measure_uuid: measure.measure_uuid,
        confirmed_value: parseInt(confirmationValue)
      };
      const service = new ConfirmMeasurement(payload);
      const response = await service.confirmMeasure();
      console.log(response);
      response.success ? alert('Confirmado') : alert('erro ao confrimar');
    };

    useEffect(() => {
      if (triggerConfirmation) {
        confirmMeasure();
        setTriggerConfirmation(false);
      }
    }, [triggerConfirmation]);

    return (
      <div style={containerStyle}>
        {file ? (
          <>
            <h2 style={titleStyle}>Foto do Medidor:</h2>
            <div style={imageContainerStyle}>
              <img
                src={URL.createObjectURL(file)}
                alt="Foto do Medidor"
                style={imageStyle}
              />
            </div>
            <div style={measureContainerStyle}>
              <h1 style={measureTitleStyle}>Medida:</h1>
              <span style={measureValueStyle}>{measure.measure_value}</span>
            </div>
            <div style={confirmationContainerStyle}>
              <input
                type="text"
                value={confirmationValue}
                onChange={handleConfirmationChange}
                placeholder="Digite a confirmação"
                style={inputStyle}
              />
              <button
                onClick={() => setTriggerConfirmation(old => !old)}
                style={buttonStyle}>
                Confirmar
              </button>
            </div>
          </>

        ) : (
          <h1>Erro inesperado</h1>
        )}
      </div>
    );
  };

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginBottom: '10px',
  textAlign: 'center',
};

const imageContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '300px',
  objectFit: 'contain',
  borderRadius: '8px',
};

const measureContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
};

const measureTitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
};

const measureValueStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#333',
};

const confirmationContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '300px',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};