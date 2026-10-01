import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './authService';

class LoginDto {
  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  senha!: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e obter token JWT' })
  async login(@Body() body: LoginDto) {
    try {
      return await this.authService.login(body.email, body.senha);
    } catch (error: any) {
      throw new HttpException(
        { message: error.message || 'Credenciais inválidas.' },
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
