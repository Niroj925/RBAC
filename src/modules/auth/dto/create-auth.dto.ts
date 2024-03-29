import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsString()
    username:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(8)
    password:string
}
