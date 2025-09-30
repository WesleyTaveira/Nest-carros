import { Carro } from "../entity/Carro";


export interface ICarroRepository {
    create(carro: Carro): void;
    find(placa: string): Carro[];
}
