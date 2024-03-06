import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/auth.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(id: string, body: CreateClientDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    // console.log(user);
    if (!user) {
      throw new ForbiddenException('user not found');
    }
    const res = await this.clientRepository.save({
      ...body,
      user: user,
    });
    return res;
  }

  async findAll() {
    const client = await this.clientRepository.find();

    return client;
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!client) {
      return { msg: 'client not found' };
    }
  
    return client; 
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    // console.log(client);

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    // const user = client.user;
    // user.email = 'thapan@gmail.com';
    // this.userRepository.save(user);

    client.contact = updateClientDto.contact;

    await this.clientRepository.save(client);

    return { msg: `Contact of client  updated successfully` };
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
