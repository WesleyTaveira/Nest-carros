
import { Injectable, NotFoundException } from "@nestjs/common";
import { Carro } from "src/domain/entity/Carro";
import { CarroRepository } from "src/infra/repository/carroRepository";
import { MarcaRepository } from "src/infra/repository/marcaRepository";



@Injectable()
export class    CreateCarroUseCase {
    constructor(private readonly carroRepository: CarroRepository, private readonly marcaRepository: MarcaRepository) {}


    async execute(carro: Carro) {
        if (carro.ano < 1900 || carro.ano > new Date().getFullYear()) {
             throw new Error("O ano deve ser um número válido entre 1900 e " + (new Date().getFullYear()))
        }

        

        const CarroMesmaPlaca =  await this.carroRepository.findMesmaPlaca(carro.placa);

        if (CarroMesmaPlaca) {
            throw new Error("Já existe um carro cadastrado com esta placa.");
        }

        const MarcaExiste =  await this.marcaRepository.find(carro.marca.id);

        if (!MarcaExiste) {
            throw new NotFoundException("Marca não encontrada.");
        }

       
        
        const novoCarro = this.carroRepository.create(carro);

        return novoCarro;
       
        
  }
}