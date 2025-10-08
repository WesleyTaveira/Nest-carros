import { CarroRepository} from "src/infra/repository/carroRepository";
import { MarcaRepository } from "src/infra/repository/marcaRepository";
import { Carro } from "src/domain/entity/Carro";
import { Injectable, NotFoundException } from "@nestjs/common";



@Injectable()
export class  UpdateCarroUseCase {
    constructor(private readonly carroRepository: CarroRepository, private readonly marcaRepository: MarcaRepository) {}


    async execute(id: number, carro: Carro) {
        const CarroExiste = await this.carroRepository.find(id);

        if(!CarroExiste) {
            throw new Error('Carro não existente!')
        }
        
        const MarcaId = await this.marcaRepository.find(carro.marca.id);

        if(!MarcaId) {
            throw new NotFoundException('Carro não encontrado.')
        }

        CarroExiste.marca = carro.marca;

        CarroExiste.placa = carro.placa;
        CarroExiste.ano = carro.ano;
        CarroExiste.modelo = carro.modelo;

        const carroAtualizado = this.carroRepository.update(id, CarroExiste); 

        return carroAtualizado;
  }
}