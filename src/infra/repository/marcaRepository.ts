import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Marca } from "src/domain/entity/Marca";


export class MarcaRepository implements IMarcaRepository{
    listaDemarcas: Marca[] = [
    
];

create(marca: Marca): void {
    this.listaDemarcas = [...this.listaDemarcas, marca];
}
find(id: number): Marca[] {
    return this.listaDemarcas.filter(item => item.id === id);
}



}