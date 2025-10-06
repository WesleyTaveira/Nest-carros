import {Controller, Get, Post, Put, Delete, HttpStatus, HttpException, Body, Param} from '@nestjs/common';
import { CarroRepository } from 'src/infra/repository/carroRepository';
import { CreateMarcaUseCase } from 'src/application/createMarcaUseCase';
import { MarcaRepository } from 'src/infra/repository/marcaRepository';
import { ListAllMarcasUseCase } from 'src/application/listAllMarcasUseCase';
import { ListMarcaByIdUseCase } from 'src/application/listMarcaByIdUseCase';
import { UpdateMarcaUseCase } from 'src/application/updateMarcaUseCase';
import { DeleteMarcaUseCase } from 'src/application/deleteMarcaUseCase';


@Controller('marca')
export class    MarcaController {
    private readonly repoCarro = new CarroRepository();
    private readonly repoMarca = new MarcaRepository();
    private readonly createMarcaUseCase = new CreateMarcaUseCase(this.repoMarca);
    private readonly listAllMarcasUseCase = new ListAllMarcasUseCase(this.repoMarca);
    private readonly listMarcaByIdUseCase = new ListMarcaByIdUseCase(this.repoMarca);
    private readonly updateMarcaUseCase = new UpdateMarcaUseCase(this.repoMarca);
    private readonly deleteMarcaUseCase = new DeleteMarcaUseCase(this.repoMarca);
    


    @Post()
    async CreateMarca (@Body() body: any) {
        try { 
            const marca = await this.createMarcaUseCase.execute(body);
            return { statusCode: 201,
                     message: "Carro salvo na marca",
                     data: marca
                    };
    
            } catch (error) {
                throw new HttpException(
                    { message: error.message || "Erro ao salvar marca" },
                    HttpStatus.BAD_REQUEST,
                )
            }
      
    } 

    
    @Get()
    async ListAllMarcas() {
        try {
            const carros = await this.listAllMarcasUseCase.execute();
            return { statusCode: 200,
                     data: carros 
                    };
        } catch (error) {
                    throw new HttpException(
                        { message: error.message || "Erro ao buscar marcas" },
                        HttpStatus.BAD_REQUEST,
                    )
                }
    }

    @Get(':id')
    async ListMarcaById(@Body() body: any) {
        try {
            const {id} = body;
            
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.listMarcaByIdUseCase.execute(body);
            return { statusCode: 200,
                    data: carro 
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao buscar marca" },
            HttpStatus.BAD_REQUEST,
        )

        }
    }

    @Put(':id')
     async UpdateMarca( @Body() body: any, @Param() param: any  ){
            try {
                const {id} = param;
                
                if (!id) {
                    return { statusCode: 400,
                        error: true,
                        message: "Id é obrigatório!" 
                    }
                };
    
                const carro = await this.updateMarcaUseCase.execute(body);
                return { statusCode: 200,
                        data: carro 
                };
        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao atualizar marca" },
                HttpStatus.BAD_REQUEST,
            )
    
            }
        }

        @Delete(':id')
        async DeleteMarca( @Body() body: any, @Param() param: any  ){
               try {
                   const {id} = param;
                   
                   if (!id) {
                       return { statusCode: 400,
                           error: true,
                           message: "Id é obrigatório!" 
                       }
                   };
       
                   const carro = await this.deleteMarcaUseCase.execute(body);
                   return { statusCode: 200,
                           data: carro 
                   };
           } catch (error) {
               throw new HttpException(
                   { message: error.message || "Erro ao deletar marca" },
                   HttpStatus.BAD_REQUEST,
               )
       
               }
           }
}