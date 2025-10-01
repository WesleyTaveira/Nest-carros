import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";
import { AppDataSource } from "../database/data-source";


export class CarroRepository implements ICarroRepository{
    listaDeCarros: Carro[] = [];
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

update(carro: Carro): Carro[] {
    return this.listaDeCarros.filter(item => item.id === carro.id)
}

delete(id: number): void {
    const carroIndex = this.listaDeCarros.findIndex(c => c.id === id);

    if (carroIndex > -1) {
      this.listaDeCarros.splice(carroIndex, 1);
    }
}

}