import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Carro } from "src/domain/entity/Carro";
import { carroRepository } from "src/infra/repository/carroRepository";
import { marcaRepository } from "src/infra/repository/marcaRepository";

export class createCarroUseCase {
    constructor(private carroRepository: ICarroRepository, private marcaRepository: IMarcaRepository) {}


    async execute(carro: Carro) {
        if (carro.ano < 1900 || carro.ano > new Date().getFullYear() + 1) {
            return console.log("O ano deve ser um número válido entre 1900 e " + (new Date().getFullYear() + 1))
        }

        const CarroMesmaPlaca = await this.carroRepository.find(carro.placa);

        if (CarroMesmaPlaca) {
            return console.log("Já existe um carro cadastrado com esta placa.");
        }

        const MarcaExiste = await this.marcaRepository.find(carro.marca);

        if (!MarcaExiste) {
            return console.log("Marca não encontrada.");
        }
        
        
  }
}