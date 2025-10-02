import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Marca } from "src/domain/entity/Marca";
import { AppDataSource } from "../database/data-source";


export class MarcaRepository implements IMarcaRepository{
    MarcaRepo = AppDataSource.getRepository(Marca);

create(marca: Marca): void {
    this.MarcaRepo.save(marca);
}

find(marcaId: number): Promise<Marca | null> {
     return this.MarcaRepo.findOneBy({
        id: marcaId
    });
}

findMesmoNome(marcaNome: string): Promise<Marca | null> {
    return this.MarcaRepo.findOneBy({
        nome: marcaNome
    });
}

findAll(): Promise<Marca[]> {
    return this.MarcaRepo.find({});

}

update(marca: Marca): Promise<Marca | null> {
    return this.MarcaRepo.save(marca);
}

delete(marcaId: number): void {
    this.MarcaRepo.delete(marcaId);
}


}