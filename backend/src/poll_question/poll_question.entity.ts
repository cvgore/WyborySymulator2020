import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { PollVote } from '@/poll_vote/poll_vote.entity';
import { PollCode } from '@/poll_code/poll_code.entity';
import { PollOption } from '@/poll-option/poll-option.entity';

@Entity()
export class PollQuestion {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	type!: string;

	@OneToMany(_ => PollCode, pollOption => pollOption.poll)
	pollOptions!: PollOption[];

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

