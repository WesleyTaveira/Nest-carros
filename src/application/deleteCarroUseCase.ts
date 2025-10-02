import { ICarroRepository } from "src/domain/contracts/ICarroRepository";



export class  DeleteCarroUseCase {
    constructor(private readonly CarroRepository: ICarroRepository) {}


    async execute(id: number) {
        const CarroExiste = await this.CarroRepository.find(id);
          

        if(!CarroExiste) {
            return console.log("Carro não existente!")
        }

        this.CarroRepository.delete(id);
        return console.log("Carro deletado!")
        
        
  }
}