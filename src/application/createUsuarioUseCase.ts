import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/infra/entities/Usuario';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(data: { nome: string; email: string; senha: string }) {
    const { nome, email, senha } = data;

    const existingUser = await this.usuarioRepository.findMesmoEmail(email);
    if (existingUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }

    const usuario = new Usuario();
    usuario.nome = nome;
    usuario.email = email.toLowerCase().trim();
    usuario.senha = senha;

    return await this.usuarioRepository.create(usuario);
  }
}
