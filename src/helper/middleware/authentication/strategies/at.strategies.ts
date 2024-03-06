import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/auth/entities/auth.entity';
import { Repository } from 'typeorm';

type JwtPayload = {
    sub: string;
    email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(
        @InjectRepository(User)
        private readonly authRepository:Repository<User>,

        private readonly authService: AuthService,
        config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('AT_SECRET'),
            ignoreExpiration: false
        });
    }

    async validate(payload:{
        sub:string,
        email:string,
        role:string
    }){
        // console.log({
        //     payload,
        // });
        const user=await this.authRepository.find({
            where:{
                id:payload.sub
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // delete user.hash;
        return user;
    }
}