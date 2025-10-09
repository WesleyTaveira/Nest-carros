import { Injectable } from "@nestjs/common";
import { MarcaRepository } from "src/infra/repository/marcaRepository";


@Injectable()
export class  DeleteMarcaUseCase {
    constructor(private readonly MarcaRepository: MarcaRepository) {}


    async execute(id: number) {
        const MarcaExiste = await this.MarcaRepository.find(id);
          

        if(!MarcaExiste) {
            throw new Error("Marca não existente!")
        }

        return this.MarcaRepository.delete(id);
         
        
        
  }
}