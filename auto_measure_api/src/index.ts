import express, { Application } from 'express';
import cors from 'cors';
import { router as measureRouter } from './adapters/routes/measurementRoutes';
import bodyParser from 'body-parser';
import { AppDataSource } from './adapters/config/data-source';
import { PORT } from './adapters/config/enviroment';

const app: Application = express();


AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((error) => {
  console.error('Error during Data Source initialization:', error);
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors()); 


app.use('/', measureRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await AppDataSource.destroy();
  console.log('Data Source has been destroyed!');
  process.exit(0);
});