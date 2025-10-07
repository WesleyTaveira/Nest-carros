import {Controller, Get, Post, Delete, HttpException,HttpStatus, Body, Param, Patch} from '@nestjs/common';
import { CreateCarroUseCase } from 'src/application/CreateCarroUseCase';
import { ListAllCarrosUseCase } from 'src/application/ListAllCarrosUseCase';
import { ListCarroByIdUseCase } from 'src/application/listCarroByIdUseCase';
import { UpdateCarroUseCase } from 'src/application/updateCarroUseCase';
import { DeleteCarroUseCase } from 'src/application/deleteCarroUseCase';



@Controller('carros')
export class CarroController {
    constructor(private readonly createCarroUseCase: CreateCarroUseCase, 
                private readonly listAllCarrosUseCase:  ListAllCarrosUseCase, private readonly listCarroByIdUseCase: ListCarroByIdUseCase,
                private readonly updateCarroUseCase: UpdateCarroUseCase, private readonly deleteCarroUseCase: DeleteCarroUseCase) {}


    
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
    async ListCarroById(@Param('id') id: number) {
        try {   
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.listCarroByIdUseCase.execute(id);
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

    @Patch(':id')
    async UpdateCarro( @Body() body: any, @Param('id') id: number  ){
        try {
            
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.updateCarroUseCase.execute(id, body);
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
    async DeleteCarro( @Param('id') id: number  ) {
        try {  
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

   
  

