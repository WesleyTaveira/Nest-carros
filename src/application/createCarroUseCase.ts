import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";


export class    CreateCarroUseCase {
    constructor(private readonly CarroRepository: ICarroRepository, private readonly MarcaRepository: IMarcaRepository) {}


    async execute(carro: Carro) {
        if (carro.ano < 1900 || carro.ano > new Date().getFullYear() + 1) {
            return console.log("O ano deve ser um número válido entre 1900 e " + (new Date().getFullYear() + 1))
        }

        

        const CarroMesmaPlaca =  this.CarroRepository.findMesmaPlaca(carro.placa);

        if (CarroMesmaPlaca) {
            return console.log("Já existe um carro cadastrado com esta placa.");
        }

        const MarcaExiste =  this.MarcaRepository.find(carro.marca.id);

        if (!MarcaExiste) {
            return console.log("Marca não encontrada.");
        }

       
        
        const novoCarro = this.CarroRepository.create(carro);

        return novoCarro;
       
        
  }
}