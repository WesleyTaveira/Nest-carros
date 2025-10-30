import { Injectable } from '@nestjs/common';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';

@Injectable()
export class DeleteMarcaUseCase {
  constructor(private readonly MarcaRepository: MarcaRepository) {}

  async execute(id: number) {
    const MarcaExiste = await this.MarcaRepository.find(id);

    if (!MarcaExiste) {
      throw new Error('Marca não existente!');
    }

    await this.MarcaRepository.delete(id);

    return { message: 'Marca deletada com sucesso.' };
  }
}
