import { Injectable, NotFoundException } from "@nestjs/common";
import { CarroRepository } from "src/infra/repository/carroRepository";


@Injectable()
export class  ListCarroByIdUseCase {
    constructor(private readonly carroRepository: CarroRepository) {}
    
    async execute(id: number) {
        // A validação de formato foi removida, pois não é responsabilidade do Use Case.
        

        //return 1;
        // Esta é a regra de negócio: buscar o carro.
        const carro = await this.carroRepository.find(id);

        // Esta é a outra regra de negócio: o que fazer se não encontrar.
        if (!carro) {
            throw new NotFoundException(`Carro com o ID ${id} não encontrado.`);
        }
        
        return carro;
        
  }
}