import React from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';

interface ExampleImageProps {
  isWater: boolean;
}

export const ExampleImage: React.FC<ExampleImageProps> = ({ isWater }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px auto',
        maxWidth: '350px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Aqui está uma imagem de exemplo
      </Typography>
      <Card
        sx={{
          maxWidth: '100%',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          image={isWater
            ? 'https://blog.brkambiental.com.br/wp-content/uploads/2019/02/conheca-seu-hidrometro.jpg'
            : 'https://http2.mlstatic.com/D_NQ_NP_989561-MLB72898397780_112023-O.webp'}
          alt={isWater ? 'Relógio de Água' : 'Relógio de Gás'}
          sx={{
            height: '200px',
            objectFit: 'contain',
          }}
        />
      </Card>
    </Box>
  );
};
