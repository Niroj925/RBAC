import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Roles } from 'src/helper/middleware/authorization/roles.decorator';
import { RolesGuard } from 'src/helper/middleware/authorization/roles.guard';
import { roleType as role } from 'src/helper/types/req.type';
import { AtGuard } from 'src/helper/middleware/authentication/guards/at.guard';

@Controller('client')
export class ClientController {

  constructor(private readonly clientService: ClientService) {}

  @Post('add')
  @UseGuards(AtGuard)
  create(@Req() req:any, @Body() body: CreateClientDto) {
    const user=req.user;
    return this.clientService.create(user.id,body);
  }


  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @Roles(role.admin,role.client)
  @UseGuards(AtGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
