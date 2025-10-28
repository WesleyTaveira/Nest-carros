import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/infra/entities/Usuario';
import { AuthService } from './authService';
import { AuthController } from './authController';
import { JwtStrategy } from './jwtStrategy';
import "reflect-metadata";

const jwtSecret = 'carroswl'
const jwtExpires = '1d'


@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpires},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {};