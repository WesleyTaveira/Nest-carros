import {Controller, Get, Post, Put, Delete, Res, Req, HttpStatus} from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { CreateMarcaUseCase } from 'src/application/createMarcaUseCase';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { ListAllMarcasUseCase } from 'src/application/listAllMarcasUseCase';


@Controller('marca')
export class    MarcaController {
    private readonly repoCarro = new CarroRepository();
    private readonly repoMarca = new MarcaRepository();
    private readonly createMarcaUseCase = new CreateMarcaUseCase(this.repoMarca);
    private readonly listAllMarcasUseCase = new ListAllMarcasUseCase(this.repoMarca);



    
    /* @Post()
    async CreateMarcas(@Req() request, @Res() response) {


    } */
    
    @Get()
    async ListAllMarcass(@Req() request, @Res() response) {
        try {
            const marcas = this.listAllMarcasUseCase.execute();
            return response.HttpStatus(marcas);

        } catch (error) {
            return console.error("Erro ao buscar marcas:", error);
    }

}

}