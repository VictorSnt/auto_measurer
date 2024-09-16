import 'reflect-metadata';
import { Measurement } from '../models/measurement';
import { DataSource } from 'typeorm';
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } from './enviroment';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",        
    port: 5432,               
    username: POSTGRES_USER,     
    password: POSTGRES_PASSWORD,   
    database: POSTGRES_DB,
    synchronize: false, 
    logging: false,
    entities: [Measurement],
    migrations: ["src/adapters/db/migrations/*.ts"]
});
