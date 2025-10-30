import { Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import "dotenv/config";
import "reflect-metadata";

const jwtSecret = 'carroswl';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
