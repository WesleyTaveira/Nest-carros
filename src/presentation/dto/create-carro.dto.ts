import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class MarcaIdDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id!: number;
}

export class CreateCarroDto {
  @ApiProperty({ example: 'ABC-1234' })
  @IsString()
  @IsNotEmpty()
  placa!: string;

  @ApiProperty({ example: 2020 })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  ano!: number;

  @ApiProperty({ example: 'Civic' })
  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @ApiProperty({ type: MarcaIdDto })
  @ValidateNested()
  @Type(() => MarcaIdDto)
  marca!: MarcaIdDto;
}
