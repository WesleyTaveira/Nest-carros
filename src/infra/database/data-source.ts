import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Carro } from '../entities/Carro';
import { Marca } from '../entities/Marca';
import { Usuario } from '../entities/Usuario';

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

const resolvedHost =
  !isDocker && dbHost === 'db' ? '127.0.0.1' : dbHost || '127.0.0.1';
const resolvedPort =
  !isDocker &&
  (dbHost === 'db' || dbHost === 'localhost' || dbHost === '127.0.0.1')
    ? 5433
    : Number(dbPort || 5432);

if (!dbHost || !dbPort || !dbUser || !dbPassword || !dbDatabase) {
  throw new Error(
    'Uma ou mais variáveis de ambiente do banco de dados não foram definidas. Verifique seu arquivo .env',
  );
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: resolvedHost,
  port: resolvedPort,
  username: dbUser,
  password: dbPassword,
  database: dbDatabase,
  synchronize: true,
  logging: false,
  entities: [Carro, Marca, Usuario],
  migrations: [],
  subscribers: [],
});
