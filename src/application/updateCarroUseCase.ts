import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";




export class  UpdateCarroUseCase {
    constructor(private readonly CarroRepository: ICarroRepository, private readonly MarcaRepository: IMarcaRepository) {}


    async execute(carro: Carro) {
        const CarroExiste = this.CarroRepository.find(carro.id);

        if(!CarroExiste) {
            return console.log("Carro não existente!")
    }
        const MarcaId = this.MarcaRepository.find(carro.marca.id);

        if(!MarcaId) {
            return console.log("Carro não encontrado!")
        }

        const carroAtualizado = this.CarroRepository.update(carro);

        return carroAtualizado;
  }
}