import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";

@Injectable()
export class CarroRepository implements ICarroRepository{
    constructor(
    @InjectRepository(Carro)
    private readonly CarroRepo: Repository<Carro>,
  ) {}


async create(carro: Carro): Promise<Carro> {
    return await this.CarroRepo.save(carro);
}

async find(id: number): Promise<Carro | null> {
    return await this.CarroRepo.findOne({
        where: { id },
        relations: ['marca'],
    })
}

async findMesmaPlaca(carroPlaca: string): Promise<Carro | null> {
    return await this.CarroRepo.findOneBy({
        placa: carroPlaca
    });
}

async findAll(): Promise<Carro[]> {
    return await this.CarroRepo.find({
        relations: ['marca']
    });

}

async update(id: number, carro: Carro): Promise<Carro | null> {
    await this.CarroRepo.update(id, carro);
    return this.CarroRepo.save(carro);
}

async delete(carroId: number): Promise<void> {
    await this.CarroRepo.delete(carroId);
    
}

  
}