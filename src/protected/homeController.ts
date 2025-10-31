import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('home')
export class HomeController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  profile(@Request() req) {
    return { message: 'rota protegida', user: req.user };
  }
}
