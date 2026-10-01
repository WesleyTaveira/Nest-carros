import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/infra/entities/Usuario';
import { AuthService } from './authService';
import { AuthController } from './authController';
import { UsuarioRepository } from 'src/infra/repository/usuarioRepository';
import { JwtStrategy } from './jwtStrategy';
import 'reflect-metadata';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET não definido no ambiente.');
        return { secret, signOptions: { expiresIn: '1d' } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
