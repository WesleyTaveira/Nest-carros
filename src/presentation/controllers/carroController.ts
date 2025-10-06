import {Controller, Get, Post, Put, Delete, HttpException,HttpStatus, Body, Param} from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { CreateCarroUseCase } from 'src/application/createCarroUseCase';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { ListAllCarrosUseCase } from 'src/application/listAllCarrosUseCase';
import { ListCarroByIdUseCase } from 'src/application/listCarroByIdUseCase';
import { UpdateCarroUseCase } from 'src/application/updateCarroUseCase';
import { DeleteCarroUseCase } from 'src/application/deleteCarroUseCase';



@Controller('carros')
export class CarroController {
    private readonly repoCarro = new CarroRepository();
    private readonly repoMarca = new MarcaRepository();
    private readonly createCarroUseCase = new CreateCarroUseCase(this.repoCarro, this.repoMarca);
    private readonly listAllCarrosUseCase = new ListAllCarrosUseCase(this.repoCarro);
    private readonly listCarroByIdUseCase = new ListCarroByIdUseCase(this.repoCarro);
    private readonly updateCarroUseCase = new UpdateCarroUseCase(this.repoCarro, this.repoMarca);
    private readonly deleteCarroUseCase = new DeleteCarroUseCase(this.repoCarro);




    
    @Post()
    async CreateCarro(@Body() body: any) {
        try {
            const { placa, ano, modelo, marca } = body;

            console.log("Dados recebidos:", { placa, ano, modelo, marca });

            if (!placa || !ano || !modelo || !marca) {
                return { statusCode: 400,
                         error: "Dados obrigatórios não fornecidos.",
                         message: "placa, ano, modelo e marca são obrigatórios"
                        }
            }

            const carro = await this.createCarroUseCase.execute(body);
            return { statusCode: 201,
                     message: "Carro salvo no banco",
                     data: carro 
            };

        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao salvar carro" },
                HttpStatus.BAD_REQUEST,
            )
        }  
    } 
    
    @Get()
    async ListAllCarros() {
        try {
            const carros = await this.listAllCarrosUseCase.execute();
            return { statusCode: 200,
                    data: carros 
            };
        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao buscar carros" },
                HttpStatus.BAD_REQUEST,
            )
    }

}
    @Get(':id')
    async ListCarroById(@Body() body: any) {
        try {
            const {id} = body;
            
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.listCarroByIdUseCase.execute(body);
            return { statusCode: 200,
                    data: carro 
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao buscar carro" },
            HttpStatus.BAD_REQUEST,
        )

            }
    }

    @Put(':id')
    async UpdateCarro( @Body() body: any, @Param() param: any  ){
        try {
            const {id} = param;
            
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.updateCarroUseCase.execute(body);
            return { statusCode: 200,
                    data: carro 
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao atualizar carro" },
            HttpStatus.BAD_REQUEST,
        )

            }
    }

    @Delete(':id')
    async DeleteCarro( @Param() param: any  ){
        try {
            const {id} = param;
            
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.deleteCarroUseCase.execute(id);
            return { statusCode: 200,
                    data: carro 
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao deletar carro" },
            HttpStatus.BAD_REQUEST,
        )

            }
    }
    

    
    
}

   
  

