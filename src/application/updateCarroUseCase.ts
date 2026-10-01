import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';

interface UpdateCarroInput {
  placa?: string;
  ano?: number;
  modelo?: string;
  marca?: { id: number };
}

@Injectable()
export class UpdateCarroUseCase {
  constructor(
    private readonly carroRepository: CarroRepository,
    private readonly marcaRepository: MarcaRepository,
  ) {}

  async execute(id: number, carro: UpdateCarroInput) {
    const carroExiste = await this.carroRepository.find(id);
    if (!carroExiste) {
      throw new NotFoundException('Carro não encontrado.');
    }

    if (carro.ano !== undefined) {
      if (carro.ano < 1900 || carro.ano > new Date().getFullYear()) {
        throw new BadRequestException(
          `O ano deve ser um número válido entre 1900 e ${new Date().getFullYear()}.`,
        );
      }
    }

    if (carro.placa) {
      const carroMesmaPlaca = await this.carroRepository.findMesmaPlacaUpdate(
        carro.placa,
        carroExiste.id,
      );
      if (carroMesmaPlaca) {
        throw new ConflictException('Já existe um carro cadastrado com esta placa.');
      }
    }

    if (carro.marca) {
      const marcaExiste = await this.marcaRepository.find(carro.marca.id);
      if (!marcaExiste) {
        throw new NotFoundException('Marca não encontrada.');
      }
    }

    Object.assign(carroExiste, carro);

    return await this.carroRepository.update(id, carroExiste);
  }
}
