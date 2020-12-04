import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsDate} from "class-validator";

@Entity()
export class Poll {
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
