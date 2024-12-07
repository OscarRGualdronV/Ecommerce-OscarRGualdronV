import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';


dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const isTestEnv = process.env.NODE_ENV === 'test';

const PostgresDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    subscribers: [],
    dropSchema: false
};

export const postgresDataSourceConfig = registerAs(
    'postgres', 
    () => PostgresDataSourceOptions);


export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);

