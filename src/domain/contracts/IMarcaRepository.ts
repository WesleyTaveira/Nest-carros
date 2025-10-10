import { Marca } from "../entity/Marca";


export interface IMarcaRepository {
    create(marca: Marca): Promise<Marca>;
    find(id: number): Promise<Marca | null>;
    findMesmoNome(nome: string): Promise<Marca | null>;
    findAll(): Promise<Marca[]>;
    update(id: number, marca: Marca): Promise<Marca | null>;
    delete(id: number): Promise<void>;
}
