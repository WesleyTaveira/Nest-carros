import { Marca } from "../entity/Marca";


export interface IMarcaRepository {
    create(marca: Marca): void;
    find(id: number): Promise<Marca | null>;
    findMesmoNome(nome: string): Promise<Marca | null>;
    findAll(): Promise<Marca[]>;
    update(marca: Marca): Promise<Marca | null>;
    delete(id: number): void;
}
