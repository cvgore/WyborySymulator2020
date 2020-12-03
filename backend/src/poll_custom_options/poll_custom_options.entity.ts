import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'
@Entity()
export class PollCustomOptions{
	@PrimaryGeneratedColumn()
	id!: number;
	@Column()
	poll_option_id!: number;
	@Column()
	voter_id!: number;

}

