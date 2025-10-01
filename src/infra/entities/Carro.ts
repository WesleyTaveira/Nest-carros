import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne} from "typeorm";
import { Marca } from "./Marca";

@Entity()
export class Carro{
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    placa!: string;

    @Column()
    ano!: number;
    
    @Column()
    modelo!: string;

    @ManyToOne(() => Marca, (marca) => marca.carros)
    marca!: Marca;



}