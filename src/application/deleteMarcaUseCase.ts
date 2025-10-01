import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";



export class  DeleteMarcaUseCase {
    constructor(private readonly MarcaRepository: IMarcaRepository) {}


    async execute(id: number) {
        const MarcaExiste = this.MarcaRepository.find(id);
          

        if(!MarcaExiste) {
            return console.log("Marca não existente!")
        }

        this.MarcaRepository.delete(id);
        return console.log("Marca deletada!")
        
        
  }
}