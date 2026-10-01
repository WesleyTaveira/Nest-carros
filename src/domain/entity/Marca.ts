import { Carro } from './Carro';

export class Marca {
  id: number;
  nome: string;
  carros: Carro[];
  constructor(id: number, nome: string, carros: Carro[]) {
    this.id = id;
    this.nome = nome;
    this.carros = carros;
  }
}
