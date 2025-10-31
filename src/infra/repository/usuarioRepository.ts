import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioRepository } from 'src/domain/contracts/IUsuarioRepository';
import { Usuario } from '../entities/Usuario';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly UserRepo: Repository<Usuario>,
  ) {}

  async create(usuario: Usuario): Promise<Usuario> {
    return await this.UserRepo.save(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.UserRepo.delete(id);
  }

  async find(id: number): Promise<Usuario | null> {
    return await this.UserRepo.findOne({
      where: { id },
    });
  }

  async findMesmoEmail(userEmail: string): Promise<Usuario | null> {
    const emailNormalizado = userEmail.toLowerCase().trim();
    return await this.UserRepo.findOne({
      where: { email: emailNormalizado },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.UserRepo.find({});
  }
}
