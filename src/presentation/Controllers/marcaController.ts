import {Controller, Get, Post, Delete, HttpStatus, HttpException, HttpCode, Body, Param, Patch} from '@nestjs/common';
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
    @HttpCode(HttpStatus.CREATED)
    async CreateMarca (@Body() body: any) {
        try { 
            const marca = await this.createMarcaUseCase.execute(body);
            return { statusCode: HttpStatus.CREATED,
                     message: "Marca salva no banco.",
                     data: marca
                    };
    
            } catch (error) {
                throw new HttpException(
                    { message: error.message || "Erro ao salvar marca." },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                )
            }
      
    } 
   
    @Get()
    @HttpCode(HttpStatus.OK)
    async ListAllMarcas() {
        try {
            const carros = await this.listAllMarcasUseCase.execute();
            return { statusCode: HttpStatus.OK,
                     data: carros 
                    };
        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao buscar marcas." },
                   HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async ListMarcaById(@Param('id') id: number) {
        try {
            
            if (!id) {
                return { statusCode: HttpStatus.BAD_REQUEST,
                    error: true,
                    message: "Id é obrigatório!" 
                }
            };

            const carro = await this.listMarcaByIdUseCase.execute(id);
            return { statusCode: HttpStatus.OK,
                    data: carro 
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao buscar marca." },
            HttpStatus.INTERNAL_SERVER_ERROR,
        )

        }
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async UpdateMarca( @Body() body: any, @Param('id') id: number  ){
            try {
                
                if (!id) {
                    return { statusCode: HttpStatus.BAD_REQUEST,
                        error: true,
                        message: "Id é obrigatório!" 
                    }
                };
    
                const carro = await this.updateMarcaUseCase.execute(id, body);
                return { statusCode: HttpStatus.OK,
                        data: carro 
                };
        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao atualizar marca." },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
    
            }
        }

        @Delete(':id')
        @HttpCode(HttpStatus.OK)
        async DeleteMarca( @Param('id') id: number  ) {
               try {
                   
                   if (!id) {
                       return { statusCode: HttpStatus.BAD_REQUEST,
                           error: true,
                           message: "Id é obrigatório!" 
                       }
                   };

                   this.deleteMarcaUseCase.execute(id);
                   return { statusCode: HttpStatus.OK,
                           message: "Marca deletada!"
                   };
           } catch (error) {
               throw new HttpException(
                   { message: error.message || "Erro ao deletar marca." },
                   HttpStatus.INTERNAL_SERVER_ERROR,
               )
       
            }
        }
}