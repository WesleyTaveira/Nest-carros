import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';

@Injectable()
export class DeleteUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id: number) {
    const usuarioExiste = await this.usuarioRepository.find(id);
    if (!usuarioExiste) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.usuarioRepository.delete(id);
    return { message: 'Usuário deletado com sucesso.' };
  }
}
