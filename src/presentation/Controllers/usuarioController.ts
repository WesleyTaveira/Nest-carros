import {
  Controller,
  Post,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Body,
  Param,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUsuarioUseCase } from 'src/application/createUsuarioUseCase';
import { DeleteUsuarioUseCase } from 'src/application/deleteUsuarioUseCase';
import { ListAllUsuariosUseCase } from 'src/application/listAllUsuariosUseCase';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly listAllUsuariosUseCase: ListAllUsuariosUseCase,
    private readonly deleteUsuarioUseCase: DeleteUsuarioUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CreateUsuario(@Body() body: { nome: string; email: string; senha: string }) {
    const usuario = await this.createUsuarioUseCase.execute(body);
    // Evita retornar a senha criptografada
    const { senha, ...rest } = usuario;
    return rest;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListAllUsuarios() {
    try {
      const usuarios = await this.listAllUsuariosUseCase.execute();
      return { statusCode: HttpStatus.OK, data: usuarios };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar usuarios.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async DeleteUsuario(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.deleteUsuarioUseCase.execute(id);
      return { statusCode: HttpStatus.OK, message: result.message };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao deletar usuário.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
