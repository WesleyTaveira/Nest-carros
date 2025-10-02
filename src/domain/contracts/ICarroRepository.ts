import { Carro } from "../entity/Carro";


export interface ICarroRepository {
    create(carro: Carro): void;
    find(id: number): Promise<Carro | null>;
    findMesmaPlaca(placa: string): Promise<Carro | null>;
    findAll(): Promise<Carro[]>;
    update(carro: Carro): Promise<Carro | null>;
    delete(id: number): void;
}
