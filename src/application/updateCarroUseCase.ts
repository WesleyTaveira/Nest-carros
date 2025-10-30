import { CarroRepository } from 'src/infra/repository/carroRepository';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { Injectable } from '@nestjs/common';
import { Marca } from 'src/domain/entity/Marca';

class UpdateCarroDto {
  placa?: string;
  ano?: number;
  modelo?: string;
  marca?: Marca;
}

@Injectable()
export class UpdateCarroUseCase {
  constructor(
    private readonly carroRepository: CarroRepository,
    private readonly marcaRepository: MarcaRepository,
  ) {}

  async execute(id: number, carro: UpdateCarroDto) {
    const CarroExiste = await this.carroRepository.find(id);

    if (!CarroExiste) {
      throw new Error('Carro não existente!');
    }

    if (carro.ano) {
      if (carro.ano < 1900 || carro.ano > new Date().getFullYear()) {
        throw new Error(
          'O ano deve ser um número válido entre 1900 e ' +
            new Date().getFullYear(),
        );
      }
    }

    if (carro.placa) {
      const CarroMesmaPlaca = await this.carroRepository.findMesmaPlacaUpdate(
        carro.placa,
        CarroExiste.id,
      );

      if (CarroMesmaPlaca) {
        throw new Error('Já existe um carro cadastrado com esta placa.');
      }
    }

    Object.assign(CarroExiste, carro);

    const carroAtualizado = this.carroRepository.update(id, CarroExiste);

    return carroAtualizado;
  }
}
