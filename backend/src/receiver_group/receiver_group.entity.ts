import {BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";


@Entity()
export class ReceiverGroup{
	@PrimaryGeneratedColumn()
	id!: number;
	@OneToOne(type => User)
	user!: User;
	@Column()
	name!: string;

}

