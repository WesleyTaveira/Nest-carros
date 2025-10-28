import { BadRequestException, Injectable } from "@nestjs/common";
import { Usuario } from "src/domain/entity/Usuario";
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from "src/infra/repository/usuarioRepository";


@Injectable()
export class CreateUsuarioUseCase {
    constructor(private readonly  usuarioRepository: UsuarioRepository) {}

    async execute(data: { nome: string; email: string; senha: string }): Promise<Usuario> {
        const { nome, email, senha } = data;
    
        // Verifica se já existe usuário com esse email
        const usuarioExistente = await this.usuarioRepository.findMesmoEmail(email);
        if (usuarioExistente) {
          throw new BadRequestException('Email já cadastrado');
        }
    
        // Criptografa a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
    
        const novoUsuario = new Usuario( nome, email,senhaHash);
        
    
        return await this.usuarioRepository.create(novoUsuario);
      }
}