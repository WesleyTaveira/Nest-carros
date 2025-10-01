import { Carro } from "../entity/Carro";


export interface ICarroRepository {
    create(carro: Carro): void;
    find(id: number): Carro[];
    findAll(): Carro[];
    update(carro: Carro): Carro[];
    delete(id: number): void;
}
