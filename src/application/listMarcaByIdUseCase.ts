import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";



export class  ListMarcaByIdUseCase {
    constructor(private readonly MarcaRepository: IMarcaRepository) {}


    async execute(id: number) {
      const marca = this.MarcaRepository.find(id);

      if (!marca) {
          return console.log("Marca não existente!")
      }
        
    return console.log(marca);
        
  }
}