import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Usuario } from "src/infra/entities/Usuario";
import { UsuarioRepository } from "src/infra/repository/usuarioRepository";

@Injectable()
export class CreateUsuarioUseCase {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(data: { nome: string; email: string; senha: string }) {
    const { nome, email, senha } = data;

    // 🔍 Verifica se já existe um usuário com o mesmo e-mail
    const existingUser = await this.usuarioRepository.findMesmoEmail(email);
    if (existingUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }

    // 🔒 Criptografa a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria a entidade do usuário
    const usuario = new Usuario();
    usuario.nome = nome;
    usuario.email = email.toLowerCase().trim();
    usuario.senha = senhaHash;

    // Salva no repositório
    return await this.usuarioRepository.create(usuario);
  }

}