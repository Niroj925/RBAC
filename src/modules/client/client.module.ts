import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from '../auth/entities/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Client,
    User
  ])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
