import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carro } from 'src/infra/entities/Carro';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { CarroController } from '../Controllers/carroController';
import { Marca } from 'src/infra/entities/Marca';

import { CreateCarroUseCase } from 'src/application/createCarroUseCase';
import { ListAllCarrosUseCase } from 'src/application/listAllCarrosUseCase';
import { ListCarroByIdUseCase } from 'src/application/listCarroByIdUseCase';
import { UpdateCarroUseCase } from 'src/application/updateCarroUseCase';
import { DeleteCarroUseCase } from 'src/application/deleteCarroUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Carro, Marca])],
  providers: [
    CarroRepository,
    MarcaRepository,
    CreateCarroUseCase,
    ListAllCarrosUseCase,
    ListCarroByIdUseCase,
    UpdateCarroUseCase,
    DeleteCarroUseCase,
  ],
  controllers: [CarroController],
})
export class CarroModule {}
