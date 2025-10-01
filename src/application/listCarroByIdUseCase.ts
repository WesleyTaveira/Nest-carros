import { ICarroRepository } from "src/domain/contracts/ICarroRepository";



export class  ListCarroByIdUseCase {
    constructor(private readonly CarroRepository: ICarroRepository) {}


    async execute(id: number) {
      const carro = this.CarroRepository.find(id);

      if (!carro) {
          return console.log("Carro não existente!")
      }
        
    return console.log(carro);
        
  }
}