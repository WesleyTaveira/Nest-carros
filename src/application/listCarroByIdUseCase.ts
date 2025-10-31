import { Injectable, NotFoundException } from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';

@Injectable()
export class ListCarroByIdUseCase {
  constructor(private readonly carroRepository: CarroRepository) {}

  async execute(id: number) {
    const carro = await this.carroRepository.find(id);

    if (!carro) {
      throw new NotFoundException(`Carro com o ID ${id} não encontrado.`);
    }

    return carro;
  }
}
