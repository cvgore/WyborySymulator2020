import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { PollCode } from '@/poll-code/poll-code.entity';
import { PollOption } from '@/poll-option/poll-option.entity';
import { Poll } from '@/poll/poll.entity';

@Entity()
export class PollQuestion {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	type!: string;

	@Column({
		default: false,
	})
	required!: boolean;

	@ManyToOne(_ => Poll)
	poll!: Poll;

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

