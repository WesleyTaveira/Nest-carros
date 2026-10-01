import {
  Controller,
  Get,
  Post,
  Delete,
  HttpException,
  HttpStatus,
  Body,
  Param,
  Patch,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCarroUseCase } from 'src/application/createCarroUseCase';
import { ListAllCarrosUseCase } from 'src/application/listAllCarrosUseCase';
import { ListCarroByIdUseCase } from 'src/application/listCarroByIdUseCase';
import { UpdateCarroUseCase } from 'src/application/updateCarroUseCase';
import { DeleteCarroUseCase } from 'src/application/deleteCarroUseCase';
import { CreateCarroDto } from '../dto/create-carro.dto';
import { UpdateCarroDto } from '../dto/update-carro.dto';

@ApiTags('Carros')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('carros')
export class CarroController {
  constructor(
    private readonly createCarroUseCase: CreateCarroUseCase,
    private readonly listAllCarrosUseCase: ListAllCarrosUseCase,
    private readonly listCarroByIdUseCase: ListCarroByIdUseCase,
    private readonly updateCarroUseCase: UpdateCarroUseCase,
    private readonly deleteCarroUseCase: DeleteCarroUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar um novo carro' })
  async CreateCarro(@Body() body: CreateCarroDto) {
    try {
      const carro = await this.createCarroUseCase.execute(body);
      return { statusCode: HttpStatus.CREATED, message: 'Carro salvo no banco.', data: carro };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao salvar carro.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos os carros' })
  async ListAllCarros() {
    try {
      const carros = await this.listAllCarrosUseCase.execute();
      return { statusCode: HttpStatus.OK, data: carros };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar carros.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar carro por ID' })
  async ListCarroById(@Param('id', ParseIntPipe) id: number) {
    try {
      const carro = await this.listCarroByIdUseCase.execute(id);
      return { statusCode: HttpStatus.OK, data: carro };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar carro.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar carro' })
  async UpdateCarro(
    @Body() body: UpdateCarroDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const carro = await this.updateCarroUseCase.execute(id, body);
      return { statusCode: HttpStatus.OK, data: carro };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao atualizar carro.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar carro' })
  async DeleteCarro(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.deleteCarroUseCase.execute(id);
      return { statusCode: HttpStatus.OK, message: result.message };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao deletar carro.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
