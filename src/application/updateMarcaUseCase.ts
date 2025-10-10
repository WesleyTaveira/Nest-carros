import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { MarcaRepository } from "src/infra/repository/marcaRepository";


@Injectable()
export class  UpdateMarcaUseCase {
    constructor(private readonly marcaRepository: MarcaRepository) {}


    async execute(id: number, dados: { nome?: string }) {
        if (!id || isNaN(id)) {
          throw new BadRequestException('Id é obrigatório e deve ser numérico.');
        }
    
        const marca = await this.marcaRepository.find(id);
        if (!marca) {
          throw new NotFoundException('Marca não encontrada.');
        }
    
        if (dados.nome) {
          const nomeEmUso = await this.marcaRepository.findMesmoNome(dados.nome);
          if (nomeEmUso && nomeEmUso.id !== id) {
            throw new BadRequestException('Já existe uma marca com esse nome.');
          }
          marca.nome = dados.nome;
        }
    
        const marcaAtualizada = await this.marcaRepository.update(id, marca);
        return marcaAtualizada;
      }
}