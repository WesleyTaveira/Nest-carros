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

findMesmoNome(nome: string): Marca[] {
    return this.listaDemarcas.filter(item => item.nome === nome);
}

findAll(): Marca[] {
    return this.listaDemarcas;

}

update(marca: Marca): Marca[] {
    return this.listaDemarcas.filter(item => item.id === marca.id)
}

delete(id: number): void {
    const marcaIndex = this.listaDemarcas.findIndex(c => c.id === id);

    if (marcaIndex > -1) {
      this.listaDemarcas.splice(marcaIndex, 1);
    }
}


}