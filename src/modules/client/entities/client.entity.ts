import { UUID } from "crypto";
import { roleType } from "src/helper/types/req.type";
import { User } from "src/modules/auth/entities/auth.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'client'})
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column({type:'bigint'})
    contact:number

    @Column({default:roleType.client})
    role:roleType

    @ManyToOne(()=>User, user=>user.client)
    user:User
}
