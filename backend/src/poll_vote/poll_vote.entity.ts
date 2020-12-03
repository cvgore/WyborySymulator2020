import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate,  } from 'class-validator';
import { hash } from 'argon2';

@Entity()
export class PollVote{
	@PrimaryGeneratedColumn()
	id!: number;
	@Column()
	poll_id!: number;
	@Column()
	poll_question_id!: number;
	@Column()
	poll_option_id!: number;

	@Column({type: "timestamp"})
	@IsDate()
	created_At!: Date;
	@Column({type:"timestamp"})
	@IsDate()
	updatedAt!: Date;

	@BeforeInsert()
	setCreatedAt(){
		this.created_At = new Date();
	}
	@BeforeInsert()
	@BeforeUpdate()
	setUpdatedAt(){
		this.updatedAt = new Date();
	}
}
