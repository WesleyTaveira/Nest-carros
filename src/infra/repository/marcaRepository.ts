import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMarcaRepository } from 'src/domain/contracts/IMarcaRepository';
import { Marca } from 'src/domain/entity/Marca';

@Injectable()
export class MarcaRepository implements IMarcaRepository {
  constructor(
    @InjectRepository(Marca)
    private readonly MarcaRepo: Repository<Marca>,
  ) {}

  async create(marca: Marca): Promise<Marca> {
    return await this.MarcaRepo.save(marca);
  }

  async find(id: number): Promise<Marca | null> {
    return await this.MarcaRepo.findOne({
      where: { id },
      relations: ['carros'],
    });
  }

  async findMesmoNome(marcaNome: string): Promise<Marca | null> {
    return await this.MarcaRepo.findOneBy({
      nome: marcaNome,
    });
  }

  async findAll(): Promise<Marca[]> {
    return await this.MarcaRepo.find({
      relations: ['carros'],
    });
  }

  async update(id: number, dados: Marca): Promise<Marca | null> {
    const marca = await this.find(id);
    if (!marca) return null;

    Object.assign(marca, dados); // Atualiza apenas os campos enviados
    return this.MarcaRepo.save(marca);
  }

  async delete(marcaId: number): Promise<void> {
    await this.MarcaRepo.delete(marcaId);
  }
}
