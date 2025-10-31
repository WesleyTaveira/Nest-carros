import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';

@Injectable()
export class ListAllUsuariosUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute() {
    const usuarios = this.usuarioRepository.findAll();

    return usuarios;
  }
}
