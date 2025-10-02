import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Marca } from "src/domain/entity/Marca";




export class  UpdateMarcaUseCase {
    constructor(private readonly MarcaRepository: IMarcaRepository) {}


    async execute(marca: Marca) {
        const MarcaExiste = await this.MarcaRepository.find(marca.id);

        if(!MarcaExiste) {
            return console.log("Marca não existente!")
    }
        MarcaExiste.nome = marca.nome;

        const marcaAtualizada = this.MarcaRepository.update(MarcaExiste);

        return marcaAtualizada;
  }
}