import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(dto: CreateLoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }

      const isCorrect = await argon.verify(user.password, dto.password);

      if (!isCorrect) {
        throw new ForbiddenException('Invalid credentials');
      }

      return this.signToken(user.id, user.email, user.role);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async signUp(dto: CreateAuthDto) {
    // console.log(dto)
    try {

      const existingUser=await this.userRepository.findOne({where:{email:dto.email}});
      if(existingUser){
        throw new ForbiddenException('user already exist')
      }
      const hash = await argon.hash(dto.password);
      const data = {
        username: dto.username,
        email: dto.email,
        password: hash,
      };
      const user = this.userRepository.create(data);
      return this.userRepository.save(user);
    } catch (error) {
      throw new ForbiddenException('Credentials taken');
    }
  }

  async findAll(){
    const users=await this.userRepository.find();
    return users
  }

  async updatePassword(body: CreateAuthDto) {}

  // To generate JWT token
  async signToken(
    userId: string,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const secret = this.config.get('AT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15hr',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
