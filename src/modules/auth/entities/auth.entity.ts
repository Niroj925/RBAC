import { roleType } from "src/helper/types/req.type";
import { Client } from "src/modules/client/entities/client.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    username:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column({default:roleType.admin})
    role:roleType

    @OneToMany(()=>Client,client=>client.user)
    client:Client[]
}
