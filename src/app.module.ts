import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import 'reflect-metadata';
import { CarroModule } from './presentation/Modules/carroModule';
import { MarcaModule } from './presentation/Modules/marcaModule';
import { UsuarioModule } from './presentation/Modules/usuarioModule';
import { AuthModule } from './auth/authModule';
import { Marca } from './infra/entities/Marca';
import { Carro } from './infra/entities/Carro';
import { Usuario } from './infra/entities/Usuario';

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

const resolvedHost =
  !isDocker && dbHost === 'db' ? '127.0.0.1' : dbHost || '127.0.0.1';
const resolvedPort =
  !isDocker && (dbHost === 'db' || dbHost === 'localhost' || dbHost === '127.0.0.1')
    ? 5433
    : Number(dbPort || 5432);

if (!dbHost || !dbPort || !dbUser || !dbPassword || !dbDatabase) {
  throw new Error(
    'Uma ou mais variáveis de ambiente do banco de dados não foram definidas. Verifique seu arquivo .env',
  );
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: resolvedHost,
      port: resolvedPort,
      username: dbUser,
      password: dbPassword,
      database: dbDatabase,
      entities: [Carro, Marca, Usuario],
      synchronize: true,
    }),
    CarroModule,
    MarcaModule,
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
