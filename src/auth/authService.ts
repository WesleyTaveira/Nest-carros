import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/infra/entities/Usuario';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const emailNormalizado = email.toLowerCase().trim();
    const user = await this.usuarioRepository.findMesmoEmail(emailNormalizado);

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  }

  async validateUser(email: string, senha: string): Promise<Usuario | null> {
    const user = await this.usuarioRepository.findMesmoEmail(email);
    if (user && (await bcrypt.compare(senha, user.senha))) {
      return user;
    }
    return null;
  }
}
