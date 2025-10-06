import { Injectable, NotFoundException } from "@nestjs/common";
import { MarcaRepository } from "src/infra/repository/marcaRepository";
import { Marca } from "src/domain/entity/Marca";



@Injectable()
export class  UpdateMarcaUseCase {
    constructor(private readonly marcaRepository: MarcaRepository) {}


    async execute(id: number, marca: Marca) {
        const MarcaExiste = await this.marcaRepository.find(id);

        if(!MarcaExiste) {
            throw new NotFoundException('Marca não encontrada')
    }
        MarcaExiste.nome = marca.nome;

        const marcaAtualizada = this.marcaRepository.update(id, MarcaExiste);

        return marcaAtualizada;
  }
}