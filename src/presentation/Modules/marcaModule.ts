import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from 'src/infra/entities/Marca';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { MarcaController } from '../Controllers/marcaController';

import { CreateMarcaUseCase } from 'src/application/createMarcaUseCase';
import { ListAllMarcasUseCase } from 'src/application/listAllMarcasUseCase';
import { ListMarcaByIdUseCase } from 'src/application/listMarcaByIdUseCase';
import { UpdateMarcaUseCase } from 'src/application/updateMarcaUseCase';
import { DeleteMarcaUseCase } from 'src/application/deleteMarcaUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  providers: [
    MarcaRepository,
    CreateMarcaUseCase,
    ListAllMarcasUseCase,
    ListMarcaByIdUseCase,
    UpdateMarcaUseCase,
    DeleteMarcaUseCase,
  ],
  controllers: [MarcaController],
})
export class MarcaModule {}
