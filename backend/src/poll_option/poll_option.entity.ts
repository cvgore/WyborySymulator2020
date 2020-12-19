import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsDate } from 'class-validator';
import { Poll } from '../poll/poll.entity';

@Entity()
@Unique(['poll', 'name'])
export class PollOption {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(_ => Poll, poll => poll.pollOptions)
	poll!: Poll;

	@Column()
	@Index()
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
