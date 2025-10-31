import { Carro } from '../entity/Carro';

export interface ICarroRepository {
  create(carro: Carro): Promise<Carro>;
  find(id: number): Promise<Carro | null>;
  findMesmaPlaca(placa: string): Promise<Carro | null>;
  findMesmaPlacaUpdate(placa: string, carroId: number): Promise<boolean>;
  findAll(): Promise<Carro[]>;
  update(id: number, carro: Carro): Promise<Carro | null>;
  delete(id: number): Promise<void>;
}
