import { IsNumber, IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    name:string

    @IsNumber()
    contact:number

   
}
