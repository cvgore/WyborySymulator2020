import {PrimaryGeneratedColumn, Column, Entity, BeforeInsert} from 'typeorm'
import { IsDate,  } from 'class-validator';
@Entity()
export class PollCodes{
	@PrimaryGeneratedColumn()
	id!: number;
	@Column()
	poll_id!: number;
	@Column()
	code!: number;
	@Column({type:"timestamp"})
	@IsDate()
	used_at!: Date;

	@BeforeInsert()
	setUsedAt(){
		this.used_at= new Date();
	}








}

