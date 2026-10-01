import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from 'src/infra/entities/Usuario';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';

@Injectable()
export class CreateUsuarioUseCase {
  private readonly logger = new Logger(CreateUsuarioUseCase.name);

  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(data: { nome: string; email: string; senha: string }) {
    const { nome, email, senha } = data;

    const existingUser = await this.usuarioRepository.findMesmoEmail(email);
    if (existingUser) {
      throw new ConflictException('Já existe um usuário cadastrado com este e-mail.');
    }

    const usuario = new Usuario();
    usuario.nome = nome;
    usuario.email = email.toLowerCase().trim();
    usuario.senha = senha;

    const criado = await this.usuarioRepository.create(usuario);
    this.logger.log(`Usuário criado: id=${criado.id} email=${criado.email}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...semSenha } = criado;
    return semSenha;
  }
}
