import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carro } from "src/infra/entities/Carro";
import { CarroRepository } from "src/infra/repository/carroRepository";
import { CarroController } from "../Controllers/carroController";
import { Marca } from "src/infra/entities/Marca";


@Module({
    imports: [TypeOrmModule.forFeature([Carro, Marca])], 
    providers: [
        CarroRepository,

    ],
    controllers: [CarroController],
})

export class CarroModule {}