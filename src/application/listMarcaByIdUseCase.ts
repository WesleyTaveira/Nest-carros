import { Injectable, NotFoundException } from '@nestjs/common';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';

@Injectable()
export class ListMarcaByIdUseCase {
  constructor(private readonly MarcaRepository: MarcaRepository) {}

  async execute(id: number) {
    const marca = await this.MarcaRepository.find(id);

    if (!marca) {
      throw new NotFoundException(`Marca com o ID ${id} não encontrado.`);
    }

    return marca;
  }
}
