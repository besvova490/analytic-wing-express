import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.EXPRESS_APP_DB_HOST,
  port: process.env.EXPRESS_APP_DB_PORT as number | undefined,
  username: process.env.EXPRESS_APP_DB_USER_NAME,
  password: process.env.EXPRESS_APP_DB_USER_PASSWORD,
  database: process.env.EXPRESS_APP_DB_NAME,
  entities: [path.join(__dirname, '../models/**/*.{js,ts}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{js,ts}')],
  logging: true,
};
const dbConnection = new DataSource(dataSourceOptions);
export default dbConnection;
