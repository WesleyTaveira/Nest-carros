import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { Marca } from 'src/domain/entity/Marca';

@Injectable()
export class CreateMarcaUseCase {
  private readonly logger = new Logger(CreateMarcaUseCase.name);

  constructor(private readonly MarcaRepository: MarcaRepository) {}

  async execute(marca: Marca) {
    const marcaMesmoNome = await this.MarcaRepository.findMesmoNome(marca.nome);
    if (marcaMesmoNome) {
      throw new ConflictException('Já existe uma marca cadastrada com esse nome.');
    }

    const novaMarca = await this.MarcaRepository.create(marca);
    this.logger.log(`Marca criada: id=${novaMarca.id} nome=${novaMarca.nome}`);
    return novaMarca;
  }
}
