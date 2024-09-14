interface ExampleImageProps {
  isWater: boolean;
}

export const ExampleImage: React.FC<ExampleImageProps> = ({ isWater }) => {
  return (
    <div>
      <h3>Aqui está uma imagem de exemplo</h3>
      <img
        src={isWater
          ? 'https://blog.brkambiental.com.br/wp-content/uploads/2019/02/conheca-seu-hidrometro.jpg'
          : 'https://http2.mlstatic.com/D_NQ_NP_989561-MLB72898397780_112023-O.webp'}
        alt={isWater ? 'Relógio de Água' : 'Relógio de Gás'}
        style={{
          maxWidth: '300px',
          height: '200px',
          objectFit: 'contain',
          borderRadius: '8px',
          margin: '20px auto',
          display: 'block'
        }}
      />
    </div>
  );
};
