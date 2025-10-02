import { IMarcaRepository } from "src/domain/contracts/IMarcaRepository";
import { Marca } from "src/domain/entity/Marca";


export class   CreateMarcaUseCase {
    constructor( private readonly MarcaRepository: IMarcaRepository) {}


    async execute(marca: Marca) {

        const MarcaMesmoNome =  await this.MarcaRepository.findMesmoNome(marca.nome);

        if (MarcaMesmoNome) {
            return console.log("Já existe uma marca cadastrada com esse nome.");

       
        }
        
        const novaMarca = this.MarcaRepository.create(marca);

        return novaMarca;


  }
}