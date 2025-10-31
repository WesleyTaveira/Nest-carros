import { Injectable } from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';

@Injectable()
export class DeleteCarroUseCase {
  constructor(private readonly carroRepository: CarroRepository) {}

  async execute(id: number) {
    const CarroExiste = await this.carroRepository.find(id);

    if (!CarroExiste) {
      throw new Error('Carro não existente!');
    }

    await this.carroRepository.delete(id);

    return { message: 'Carro deletado com sucesso.' };
  }
}
