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
} from '@nestjs/common';
import { CreateCarroUseCase } from 'src/application/createCarroUseCase';
import { ListAllCarrosUseCase } from 'src/application/listAllCarrosUseCase';
import { ListCarroByIdUseCase } from 'src/application/listCarroByIdUseCase';
import { UpdateCarroUseCase } from 'src/application/updateCarroUseCase';
import { DeleteCarroUseCase } from 'src/application/deleteCarroUseCase';

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
  async CreateCarro(@Body() body: any) {
    try {
      const { placa, ano, modelo, marca } = body;

      if (!placa || !ano || !modelo || !marca) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Dados obrigatórios não fornecidos.',
          message: 'placa, ano, modelo e marca são obrigatórios.',
        };
      }

      const carro = await this.createCarroUseCase.execute(body);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Carro salvo no banco.',
        data: carro,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao salvar carro.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async ListAllCarros() {
    try {
      const carros = await this.listAllCarrosUseCase.execute();
      return { statusCode: HttpStatus.OK, data: carros };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar carros.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async ListCarroById(@Param('id', ParseIntPipe) id: number) {
    try {
      const carro = await this.listCarroByIdUseCase.execute(Number(id));

      return {
        statusCode: HttpStatus.OK,
        data: carro,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar carro.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async UpdateCarro(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    try {
      const carro = await this.updateCarroUseCase.execute(id, body);
      return { statusCode: HttpStatus.OK, data: carro };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao atualizar carro.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async DeleteCarro(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.deleteCarroUseCase.execute(id);
      return { statusCode: HttpStatus.OK, message: result.message };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Erro ao deletar carro.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
