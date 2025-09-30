import { Carro } from "./Carro";

export class Marca {
    nome: string;
    carros: Carro[];
    constructor( nome: string, carros: Carro[]){
        this.nome = nome;
        this.carros = carros;
    }
}