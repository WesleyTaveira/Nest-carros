import { Marca } from "../entity/Marca";


export interface IMarcaRepository {
    create(marca: Marca): void;
    find(id: number): Marca[];
    findMesmoNome(nome: string): Marca[];
    findAll(): Marca[];
    update(marca: Marca): Marca[];
    delete(id: number): void;
}
