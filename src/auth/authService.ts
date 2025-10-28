import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/infra/entities/Usuario";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Usuario)
        private readonly UserRepo: Repository<Usuario>
    ) {}

    async validarUsuario(email: string, senha: string) {
        console.log('🟢 Email recebido:', email);
        const user = await this.UserRepo.findOne({where: {email}});
        console.log('🟡 Usuário encontrado:', user);
        
        if (!user) return null;

        
        console.log('🔵 Senha digitada:', senha);
        console.log('🟣 Senha no banco:', user.senha);

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) return null;


        const {senha: _, ...result } = user as any;
        return result;
        
    }

    async login(email: string, senha: string) {
        const user = await this.UserRepo.findOne({where: {email}});
        if (!user) throw new UnauthorizedException('Email ou senha inválidos.');
        
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) throw new UnauthorizedException('Email ou senha inválidos.');

        const payload = {sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        const {senha: _, ...userSafe } = user as any;
        return {access_token: token, usuario: userSafe};
        
    }
}