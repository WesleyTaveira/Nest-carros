import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Marca } from "src/domain/entity/Marca";


export class marcaRepository implements IMarcaRepository{
    constructor(){}
    listaDemarcas: Marca[] = [
    
];

create(marca: Marca): void {
    this.listaDemarcas = [...this.listaDemarcas, marca];
}
find(nome: string): Marca[] {
    return this.listaDemarcas.filter(item => item.nome === nome);
}



}