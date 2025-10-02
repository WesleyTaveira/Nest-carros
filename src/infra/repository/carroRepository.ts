import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";
import { AppDataSource } from "../database/data-source";


export class CarroRepository implements ICarroRepository{
    CarroRepo = AppDataSource.getRepository(Carro);

create(carro: Carro): void {
    this.CarroRepo.save(carro);
}

find(carroId: number): Promise<Carro | null> {
    return this.CarroRepo.findOneBy({
        id: carroId
    });
}

findMesmaPlaca(carroPlaca: string): Promise<Carro | null> {
        return this.CarroRepo.findOneBy({
        placa: carroPlaca
    });
}

findAll(): Promise<Carro[]> {
    return this.CarroRepo.find({});

}

update(carro: Carro): Promise<Carro | null> {
    return this.CarroRepo.save(carro);

}

delete(carroId: number): void {
    this.CarroRepo.delete(carroId);
    
}

}