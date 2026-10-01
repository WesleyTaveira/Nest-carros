import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';

interface CreateCarroInput {
  placa: string;
  ano: number;
  modelo: string;
  marca: { id: number };
}

@Injectable()
export class CreateCarroUseCase {
  private readonly logger = new Logger(CreateCarroUseCase.name);

  constructor(
    private readonly carroRepository: CarroRepository,
    private readonly marcaRepository: MarcaRepository,
  ) {}

  async execute(carro: CreateCarroInput) {
    if (carro.ano < 1900 || carro.ano > new Date().getFullYear()) {
      throw new BadRequestException(
        `O ano deve ser um número válido entre 1900 e ${new Date().getFullYear()}.`,
      );
    }

    const carroMesmaPlaca = await this.carroRepository.findMesmaPlaca(carro.placa);
    if (carroMesmaPlaca) {
      throw new ConflictException('Já existe um carro cadastrado com esta placa.');
    }

    const marcaExiste = await this.marcaRepository.find(carro.marca.id);
    if (!marcaExiste) {
      throw new NotFoundException('Marca não encontrada.');
    }

    const novoCarro = await this.carroRepository.create(carro as any);
    this.logger.log(`Carro criado: id=${novoCarro.id} placa=${novoCarro.placa}`);
    return novoCarro;
  }
}
