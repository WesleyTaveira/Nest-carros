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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioUseCase } from 'src/application/createUsuarioUseCase';
import { DeleteUsuarioUseCase } from 'src/application/deleteUsuarioUseCase';
import { ListAllUsuariosUseCase } from 'src/application/listAllUsuariosUseCase';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@ApiTags('Usuários')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly listAllUsuariosUseCase: ListAllUsuariosUseCase,
    private readonly deleteUsuarioUseCase: DeleteUsuarioUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  async CreateUsuario(@Body() body: CreateUsuarioDto) {
    try {
      const usuario = await this.createUsuarioUseCase.execute(body);
      return { statusCode: HttpStatus.CREATED, message: 'Usuário salvo no banco.', data: usuario };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao salvar usuário.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  async ListAllUsuarios() {
    try {
      const usuarios = await this.listAllUsuariosUseCase.execute();
      return { statusCode: HttpStatus.OK, data: usuarios };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar usuários.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar usuário' })
  async DeleteUsuario(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.deleteUsuarioUseCase.execute(id);
      return { statusCode: HttpStatus.OK, message: result.message };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao deletar usuário.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
