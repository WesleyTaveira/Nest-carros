import { ICarroRepository } from "src/domain/contracts/ICarroRepository";



export class  ListAllCarrosUseCase {
    constructor(private readonly CarroRepository: ICarroRepository) {}


    async execute() {
        const carros = this.CarroRepository.findAll();
        
        return console.log(carros);
        
  }
}