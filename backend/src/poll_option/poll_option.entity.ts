import {BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsDate} from "class-validator";


@Entity()
export class PollOption{
	@PrimaryGeneratedColumn()
	id!: number;
	@Column()
	poll_id!: number;
	@Column()
	name!: string;

	@Column({type: 'timestamp'})
	@IsDate()
	createdAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	updatedAt!: Date;

	@BeforeInsert()
	setCreatedAt() {
		this.createdAt = new Date();
	}

	@BeforeInsert()
	@BeforeUpdate()
	setUpdatedAt() {
		this.updatedAt = new Date();
	}
}
