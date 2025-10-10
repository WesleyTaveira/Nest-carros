import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { MarcaRepository } from "src/infra/repository/marcaRepository";


@Injectable()
export class  UpdateMarcaUseCase {
    constructor(private readonly marcaRepository: MarcaRepository) {}


    async execute(id: number, marca: { nome?: string }) {
        if (!id || isNaN(id)) {
          throw new BadRequestException('Id é obrigatório e deve ser numérico.');
        }
    
        const MarcaExiste = await this.marcaRepository.find(id);
        if (!MarcaExiste) {
          throw new NotFoundException('Marca não encontrada.');
        }
    
        if (marca.nome) {
          const nomeEmUso = await this.marcaRepository.findMesmoNome(marca.nome);
          if (nomeEmUso && nomeEmUso.id !== id) {
            throw new BadRequestException('Já existe uma MarcaExiste com esse nome.');
          }
          MarcaExiste.nome = marca.nome;
        }
    
        const marcaAtualizada = await this.marcaRepository.update(id, MarcaExiste);
        return marcaAtualizada;
      }
}