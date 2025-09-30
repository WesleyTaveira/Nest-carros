import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";


export class carroRepository implements ICarroRepository{
    constructor(){}
    listaDeCarros: Carro[] = [
    {placa: "PBL6I83", ano: 2018, modelo: "UP", marca: "Volkswagen"},
    {placa: "PBL6I85", ano: 2020, modelo: "C6", marca: "Citroen"}
];

create(carro: Carro): void {
    this.listaDeCarros = [...this.listaDeCarros, carro];
}
find(placa: string): Carro[] {
    return this.listaDeCarros.filter(item => item.placa === placa);
}



}