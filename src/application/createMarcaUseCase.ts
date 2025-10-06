import { Injectable} from "@nestjs/common";
import { MarcaRepository } from "src/infra/repository/marcaRepository"; 
import { Marca } from "src/domain/entity/Marca";

@Injectable()
export class   CreateMarcaUseCase {
    constructor( private readonly MarcaRepository: MarcaRepository) {}


    async execute(marca: Marca) {

        const MarcaMesmoNome =  await this.MarcaRepository.findMesmoNome(marca.nome);

        if (MarcaMesmoNome) {
            throw new Error("Já existe uma marca cadastrada com esse nome.");

       
        }
        
        const novaMarca = this.MarcaRepository.create(marca);

        return novaMarca;


  }
}