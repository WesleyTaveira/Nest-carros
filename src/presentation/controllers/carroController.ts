import {Controller, Get, Post, Put, Delete, Res, Req, HttpStatus} from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { CreateCarroUseCase } from 'src/application/createCarroUseCase';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { ListAllCarrosUseCase } from 'src/application/listAllCarrosUseCase';


@Controller('carros')
export class CarroController {
    private readonly repoCarro = new CarroRepository();
    private readonly repoMarca = new MarcaRepository();
    private readonly createCarroUseCase = new CreateCarroUseCase(this.repoCarro, this.repoMarca);
    private readonly listAllCarrosUseCase = new ListAllCarrosUseCase(this.repoCarro);



    
    /* @Post()
    async CreateCarros(@Req() request, @Res() response) {


    } */
    
    @Get()
    async ListAllCarros(@Req() request, @Res() response) {
        try {
            const carros = this.listAllCarrosUseCase.execute();
            return response.HttpStatus(carros);

        } catch (error) {
            return console.error("Erro ao buscar carros:", error);
    }

}

}