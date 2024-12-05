import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';


dotenv.config({
    path: '.env.development',
});

const sqliteTestDataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dropSchema: true
}

const PostgresDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

export const sqliteTestDataSourceConfig = registerAs(
    'sqlite',
    () => sqliteTestDataSourceOptions
)    

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);
export const SqliteTestDataSource = new DataSource(sqliteTestDataSourceOptions);