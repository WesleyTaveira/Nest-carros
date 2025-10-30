import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/infra/entities/Usuario';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';
import { UsuarioController } from '../Controllers/usuarioController';

import { CreateUsuarioUseCase } from 'src/application/createUsuarioUseCase';
import { DeleteUsuarioUseCase } from 'src/application/deleteUsuarioUseCase';
import { ListAllUsuariosUseCase } from 'src/application/listAllUsuariosUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [
    UsuarioRepository,
    CreateUsuarioUseCase,
    DeleteUsuarioUseCase,
    ListAllUsuariosUseCase,
  ],
  controllers: [UsuarioController],
  exports: [UsuarioRepository],
})
export class UsuarioModule {}
