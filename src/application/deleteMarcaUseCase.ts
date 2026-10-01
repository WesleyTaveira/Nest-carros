import { Injectable, NotFoundException } from '@nestjs/common';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';

@Injectable()
export class DeleteMarcaUseCase {
  constructor(private readonly MarcaRepository: MarcaRepository) {}

  async execute(id: number) {
    const marcaExiste = await this.MarcaRepository.find(id);
    if (!marcaExiste) {
      throw new NotFoundException('Marca não encontrada.');
    }

    await this.MarcaRepository.delete(id);
    return { message: 'Marca deletada com sucesso.' };
  }
}
