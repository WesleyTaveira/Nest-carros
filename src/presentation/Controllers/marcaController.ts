import {Controller, Get, Post, Delete, HttpStatus, HttpException, Body, Param, Patch} from '@nestjs/common';
import { CreateMarcaUseCase } from 'src/application/createMarcaUseCase';
import { ListAllMarcasUseCase } from 'src/application/listAllMarcasUseCase';
import { ListMarcaByIdUseCase } from 'src/application/listMarcaByIdUseCase';
import { UpdateMarcaUseCase } from 'src/application/updateMarcaUseCase';
import { DeleteMarcaUseCase } from 'src/application/deleteMarcaUseCase';


@Controller('marcas')
export class MarcaController {
    constructor(private readonly createMarcaUseCase: CreateMarcaUseCase, 
                private readonly listAllMarcasUseCase:  ListAllMarcasUseCase, private readonly listMarcaByIdUseCase: ListMarcaByIdUseCase,
                private readonly updateMarcaUseCase: UpdateMarcaUseCase, private readonly deleteMarcaUseCase: DeleteMarcaUseCase) {}

    @Post()
    async CreateMarca (@Body() body: any) {
        try { 
            const marca = await this.createMarcaUseCase.execute(body);
            return { statusCode: 201,
                     message: "Marca salva no banco.",
                     data: marca
                    };
    
            } catch (error) {
                throw new HttpException(
                    { message: error.message || "Erro ao salvar marca." },
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
                { message: error.message || "Erro ao buscar marcas." },
                   HttpStatus.BAD_REQUEST,
            )
        }
    }

    @Get(':id')
    async ListMarcaById(@Param('id') id: number) {
        try {
            
            if (!id) {
                return { statusCode: 400,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.listMarcaByIdUseCase.execute(id);
            return { statusCode: 200,
                    data: carro 
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao buscar marca." },
            HttpStatus.BAD_REQUEST,
        )

        }
    }

    @Patch(':id')
     async UpdateMarca( @Body() body: any, @Param('id') id: number  ){
            try {
                
                if (!id) {
                    return { statusCode: 400,
                        error: true,
                        message: "Id é obrigatório!" 
                    }
                };
    
                const carro = await this.updateMarcaUseCase.execute(id, body);
                return { statusCode: 200,
                        data: carro 
                };
        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao atualizar marca." },
                HttpStatus.BAD_REQUEST,
            )
    
            }
        }

        @Delete(':id')
        async DeleteMarca( @Param('id') id: number  ) {
               try {
                   
                   if (!id) {
                       return { statusCode: 400,
                           error: true,
                           message: "Id é obrigatório!" 
                       }
                   };

                   const carro = await this.deleteMarcaUseCase.execute(id);
                   return { statusCode: 200,
                           data: carro 
                   };
           } catch (error) {
               throw new HttpException(
                   { message: error.message || "Erro ao deletar marca." },
                   HttpStatus.BAD_REQUEST,
               )
       
               }
        }
}