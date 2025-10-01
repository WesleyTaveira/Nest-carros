import { Marca } from "../entity/Marca";


export interface IMarcaRepository {
    create(marca: Marca): void;
    find(id: number): Marca[];
}
