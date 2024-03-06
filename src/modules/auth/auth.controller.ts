import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Roles } from 'src/helper/middleware/authorization/roles.decorator';
import { roleType } from 'src/helper/types/req.type';
import { AtGuard } from 'src/helper/middleware/authentication/guards/at.guard';
import { RolesGuard } from 'src/helper/middleware/authorization/roles.guard';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  signIn(@Body() creatLoginDto: CreateLoginDto) {
    return this.authService.signIn(creatLoginDto);
  }

  @Post('signup')
  signUp(@Body() createAuthDto:CreateAuthDto){
    return this.authService.signUp(createAuthDto);
  }

  @Get()
  findAll(){
    return this.authService.findAll()
  }

  @Patch("resetpass")
  @Roles(roleType.client,roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  // @UseGuards(AtGuard)
  updatePassword(@Req() req:any, @Body() body:UpdateAuthDto) {
    const user=req.user;
    console.log(user)
    return this.authService.updatePassword(user.id,body)
  }
}
