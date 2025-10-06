import { Injectable } from "@nestjs/common";
import { MarcaRepository } from "src/infra/repository/marcaRepository";


@Injectable()
export class  ListAllMarcasUseCase {
    constructor(private readonly marcaRepository: MarcaRepository) {}


    async execute() {
        const marcas = this.marcaRepository.findAll();
        
        return console.log(marcas);
        
  }
}