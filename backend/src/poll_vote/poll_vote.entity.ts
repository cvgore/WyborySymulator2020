import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { IsDate, } from 'class-validator';
import { PollQuestion } from '@/poll_question/poll_question.entity';
import { Poll } from '@/poll/poll.entity';
import { PollOption } from '@/poll_option/poll_option.entity';
import { PollCustomOption } from '@/poll_custom_option/poll_custom_option.entity';

@Entity()
export class PollVote {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(_ => Poll, poll => poll.pollVotes)
	poll!: Poll;

	@ManyToOne(_ => PollQuestion)
	pollQuestion!: PollQuestion;

	@ManyToOne(_ => PollOption, pollOption => pollOption.pollVotes)
	pollOption!: PollOption;

	@OneToOne(_ => PollCustomOption)
	pollCustomOption!: PollCustomOption | null;

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
