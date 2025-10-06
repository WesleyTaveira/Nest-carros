import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Marca } from "src/domain/entity/Marca";
import { AppDataSource } from "../database/data-source";


export class MarcaRepository implements IMarcaRepository{
    MarcaRepo = AppDataSource.getRepository(Marca);

async create(marca: Marca): Promise<void> {
    await this.MarcaRepo.save(marca);
}

async find(marcaId: number): Promise<Marca | null> {
     return this.MarcaRepo.findOneBy({
        id: marcaId
    });
}

async findMesmoNome(marcaNome: string): Promise<Marca | null> {
    return this.MarcaRepo.findOneBy({
        nome: marcaNome
    });
}

async findAll(): Promise<Marca[]> {
    return this.MarcaRepo.find({});

}

async update(id: number, marca: Marca): Promise<Marca | null> {
    await this.MarcaRepo.update(id, marca);
    return this.find(id);
}

async delete(marcaId: number): Promise<void> {
    await this.MarcaRepo.delete(marcaId);
}


}