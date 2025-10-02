import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";




export class  UpdateCarroUseCase {
    constructor(private readonly CarroRepository: ICarroRepository, private readonly MarcaRepository: IMarcaRepository) {}


    async execute(carro: Carro) {
        const CarroExiste = await this.CarroRepository.find(carro.id);

        if(!CarroExiste) {
            return console.log("Carro não existente!")
        }
        
        const MarcaId = await this.MarcaRepository.find(carro.marca.id);

        if(!MarcaId) {
            return console.log("Carro não encontrado!")
        }

        CarroExiste.marca = carro.marca;

        CarroExiste.placa = carro.placa;
        CarroExiste.ano = carro.ano;
        CarroExiste.modelo = carro.modelo;

        const carroAtualizado = this.CarroRepository.update(CarroExiste);

        return carroAtualizado;
  }
}