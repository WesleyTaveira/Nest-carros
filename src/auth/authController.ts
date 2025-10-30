import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './authService';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const { email, senha } = body;

    if (!email || !senha) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Dados obrigatórios não fornecidos.',
        message: 'email e senha são obrigatórios.',
      };
    }

    return this.authService.login(email, senha);
  }
}
