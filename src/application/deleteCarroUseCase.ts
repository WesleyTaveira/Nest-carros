import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';

@Injectable()
export class DeleteCarroUseCase {
  private readonly logger = new Logger(DeleteCarroUseCase.name);

  constructor(private readonly carroRepository: CarroRepository) {}

  async execute(id: number) {
    const carroExiste = await this.carroRepository.find(id);
    if (!carroExiste) {
      throw new NotFoundException('Carro não encontrado.');
    }

    await this.carroRepository.delete(id);
    this.logger.log(`Carro deletado: id=${id}`);
    return { message: 'Carro deletado com sucesso.' };
  }
}
