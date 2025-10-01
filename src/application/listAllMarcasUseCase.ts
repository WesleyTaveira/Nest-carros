import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";



export class  ListAllMarcasUseCase {
    constructor(private readonly MarcaRepository: IMarcaRepository) {}


    async execute() {
        const marcas = this.MarcaRepository.findAll();
        
        return console.log(marcas);
        
  }
}