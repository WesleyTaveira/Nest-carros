import { ICarroRepository } from "src/domain/contracts/ICarroRepository";
import { Carro } from "src/domain/entity/Carro";


export class CarroRepository implements ICarroRepository{
    listaDeCarros: Carro[] = [];

create(carro: Carro): void {
    this.listaDeCarros = [...this.listaDeCarros, carro];
}

find(id: number): Carro[] {
    return this.listaDeCarros.filter(item => item.id === id);
}

findAll(): Carro[] {
    return this.listaDeCarros;

}

update(carro: Carro): Carro[] {
    return this.listaDeCarros.filter(item => item.id === carro.id)
}

delete(id: number): void {
    const carroIndex = this.listaDeCarros.findIndex(c => c.id === id);

    if (carroIndex > -1) {
      this.listaDeCarros.splice(carroIndex, 1);
    }
}

}