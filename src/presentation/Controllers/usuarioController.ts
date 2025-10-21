import {Controller, Post, Delete, HttpException,HttpStatus, Body, Param, HttpCode, ParseIntPipe} from '@nestjs/common';
import { CreateUsuarioUseCase } from 'src/application/createUsuarioUseCase';
import { DeleteUsuarioUseCase } from 'src/application/deleteUsuarioUseCase';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly createUsuarioUseCase: CreateUsuarioUseCase, 
                private readonly deleteUsuarioUseCase: DeleteUsuarioUseCase) {}


    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async CreateUsuario(@Body() body: any) {
        try {
            const { nome, email, senha } = body;

            if (!nome || !email || !senha ) {
                return { statusCode: HttpStatus.BAD_REQUEST,
                         error: "Dados obrigatórios não fornecidos.",
                         message: "nome, email e senha são obrigatórios."
                        }
            }

            const usuario = await this.createUsuarioUseCase.execute(body);
            return { statusCode: HttpStatus.CREATED,
                     message: "Usuário salvo no banco.",
                     data: usuario 
            };

        } catch (error) {
            throw new HttpException(
                { message: error.message || "Erro ao salvar usuário." },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }  
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async DeleteUsuario( @Param('id', ParseIntPipe) id: number  ) {
        try {  
            
            
            const result = await this.deleteUsuarioUseCase.execute(id);
            return { statusCode: HttpStatus.OK,
                    message: result.message,
            };
    } catch (error) {
        throw new HttpException(
            { message: error.message || "Erro ao deletar usuário." },
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        )

        }
    }
    
}