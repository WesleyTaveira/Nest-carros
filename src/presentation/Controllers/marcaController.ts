import {
  Controller,
  Get,
  Post,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
  Body,
  Param,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMarcaUseCase } from 'src/application/createMarcaUseCase';
import { ListAllMarcasUseCase } from 'src/application/listAllMarcasUseCase';
import { ListMarcaByIdUseCase } from 'src/application/listMarcaByIdUseCase';
import { UpdateMarcaUseCase } from 'src/application/updateMarcaUseCase';
import { DeleteMarcaUseCase } from 'src/application/deleteMarcaUseCase';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

@ApiTags('Marcas')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('marcas')
export class MarcaController {
  constructor(
    private readonly createMarcaUseCase: CreateMarcaUseCase,
    private readonly listAllMarcasUseCase: ListAllMarcasUseCase,
    private readonly listMarcaByIdUseCase: ListMarcaByIdUseCase,
    private readonly updateMarcaUseCase: UpdateMarcaUseCase,
    private readonly deleteMarcaUseCase: DeleteMarcaUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar uma nova marca' })
  async CreateMarca(@Body() body: CreateMarcaDto) {
    try {
      const marca = await this.createMarcaUseCase.execute(body as any);
      return { statusCode: HttpStatus.CREATED, message: 'Marca salva no banco.', data: marca };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao salvar marca.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todas as marcas' })
  async ListAllMarcas() {
    try {
      const marcas = await this.listAllMarcasUseCase.execute();
      return { statusCode: HttpStatus.OK, data: marcas };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar marcas.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar marca por ID' })
  async ListMarcaById(@Param('id', ParseIntPipe) id: number) {
    try {
      const marca = await this.listMarcaByIdUseCase.execute(id);
      return { statusCode: HttpStatus.OK, data: marca };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao buscar marca.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar marca' })
  async UpdateMarca(
    @Body() body: UpdateMarcaDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const marca = await this.updateMarcaUseCase.execute(id, body);
      return { statusCode: HttpStatus.OK, data: marca };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao atualizar marca.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar marca' })
  async DeleteMarca(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.deleteMarcaUseCase.execute(id);
      return { statusCode: HttpStatus.OK, message: result.message };
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Erro ao deletar marca.' },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
