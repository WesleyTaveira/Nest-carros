import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @BeforeInsert()
  async hashSenha() {
    if (this.senha) {
      const salt = await bcrypt.genSalt(10);
      this.senha = await bcrypt.hash(this.senha, salt);
    }
  }
}
