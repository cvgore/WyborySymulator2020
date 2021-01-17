import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique
} from 'typeorm';
import { IsDate } from 'class-validator';
import { Poll } from '@/poll/poll.entity';
import { PollCustomOption } from '@/poll_custom_option/poll_custom_option.entity';
import { PollVote } from '@/poll_vote/poll_vote.entity';
import { PollQuestion } from '@/poll_question/poll_question.entity';

@Entity()
export class PollOption {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(_ => PollQuestion, poll => poll.pollOptions)
	pollQuestion!: PollQuestion;

	@OneToOne(_ => PollCustomOption)
	pollCustomOption!: PollCustomOption | null;

	@OneToMany(_ => PollVote, pollVote => pollVote.pollOption)
	pollVotes!: PollVote[];

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
