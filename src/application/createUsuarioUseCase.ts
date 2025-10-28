import { Injectable } from "@nestjs/common";
import { Usuario } from "src/domain/entity/Usuario";
import { UsuarioRepository } from "src/infra/repository/usuarioRepository";

@Injectable()
export class CreateUsuarioUseCase {
    constructor(private readonly  usuarioRepository: UsuarioRepository) {}

    async execute (usuario:  Usuario){
        
        const MesmoEmail = await this.usuarioRepository.findMesmoEmail(usuario.email)

        if(MesmoEmail) {
            throw new Error("Já existe um usuário cadastrado com esse email.");
        }

        const novoUsuario = this.usuarioRepository.create(usuario);

        return novoUsuario;
    }


}