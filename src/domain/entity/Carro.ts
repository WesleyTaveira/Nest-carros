import { Marca } from "./Marca";

export class Carro {
    id: number;
    placa: string;
    ano: number;
    modelo: string;
    marca: Marca;
    constructor(id: number, placa: string, ano: number, modelo: string, marca: Marca) {
        this.id = id;
        this.placa = placa;
        this.ano = ano;
        this.modelo = modelo;
        this.marca = marca;

    }

}