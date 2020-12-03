import {BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {IsDate, IsEmail} from "class-validator";
import {hash} from "argon2";

@Entity()
export class Poll{
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	user_id!: number;

	@Column()
	type!: string;

	@Column()
	color_schema!: number;

	@Column({type: 'timestamp'})
	@IsDate()
	valid_from!: Date;
	@Column({type: 'timestamp'})
	@IsDate()
	valid_until!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	published_at!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	createdAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	updatedAt!: Date;


}
