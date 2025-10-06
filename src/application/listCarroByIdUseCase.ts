import { Injectable } from "@nestjs/common";
import { CarroRepository } from "src/infra/repository/carroRepository";


@Injectable()
export class  ListCarroByIdUseCase {
    constructor(private readonly carroRepository: CarroRepository) {}
    
    async execute(id: number) {
      const carro = await this.carroRepository.find(id);

      if (!carro) {
          throw new Error("Carro não existente!")
      }
        
    return console.log(carro);
        
  }
}