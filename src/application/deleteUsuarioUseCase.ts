import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "src/infra/repository/usuarioRepository";

@Injectable()
export class DeleteUsuarioUseCase {
    constructor(private readonly  usuarioRepository: UsuarioRepository) {}

    async execute (id: number){
        
        const UsuarioExiste = await this.usuarioRepository.find(id);
          

        if(!UsuarioExiste) {
            throw new Error("Usuário não existente!")
        }

        
        await this.usuarioRepository.delete(id);
        
        return { message: 'Usuário deletado com sucesso.' };
    }


}