import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import "dotenv/config";
import "reflect-metadata";
import { CarroModule } from './presentation/Modules/carroModule';
import { MarcaModule } from './presentation/Modules/marcaModule';
import { UsuarioModule } from './presentation/Modules/usuarioModule';
import { Marca } from './infra/entities/Marca';
import { Carro } from './infra/entities/Carro';
import { Usuario } from './infra/entities/Usuario';

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

// 2. Verifique se todas as variáveis essenciais foram definidas
if (!dbHost || !dbPort || !dbUser || !dbPassword || !dbDatabase) {
    throw new Error("Uma ou mais variáveis de ambiente do banco de dados não foram definidas. Verifique seu arquivo .env");
}


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
    type: "postgres",
    host: dbHost, // Lê do ambiente
    port: Number(dbPort), // Lê do ambiente
    username: dbUser,   // Lê do ambiente
    password: dbPassword, // Lê do ambiente
    database: dbDatabase, // Lê do ambiente
    entities: [Carro,Marca,Usuario],
    synchronize: true,
    logging: false,
  }),
    CarroModule,
    MarcaModule,
    UsuarioModule
],
})

export class AppModule {}
