import { Injectable } from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';

@Injectable()
export class ListAllCarrosUseCase {
  constructor(private readonly carroRepository: CarroRepository) {}

  async execute() {
    const carros = await this.carroRepository.findAll();

    return carros;
  }
}
