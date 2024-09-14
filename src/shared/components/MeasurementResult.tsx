interface MeasurementResultProps {
  file: File;
  measure: any;
}

export const MeasurementResult: React.FC<MeasurementResultProps> = ({ file, measure }) => {
  return (
    <div>
      <h2>Foto do Medidor:</h2>
      <img
        src={URL.createObjectURL(file)}
        alt="Foto do Medidor"
        style={{
          maxWidth: '300px',
          height: '200px',
          objectFit: 'contain',
          borderRadius: '8px',
          margin: '20px auto',
          display: 'block'
        }}
      />
      <h1>Medida: {measure.measure_value}</h1>
    </div>
  );
};
