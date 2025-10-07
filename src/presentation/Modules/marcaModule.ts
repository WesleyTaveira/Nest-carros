import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Marca } from "src/infra/entities/Marca";
import { MarcaRepository } from "src/infra/repository/marcaRepository";
import { MarcaController } from "../Controllers/marcaController";


@Module({
    imports: [TypeOrmModule.forFeature([Marca])], 
    providers: [
        MarcaRepository,

    ],
    controllers: [MarcaController],
})

export class MarcaModule {}
