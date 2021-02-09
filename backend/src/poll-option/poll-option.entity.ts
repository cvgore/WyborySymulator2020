import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { IsDate } from 'class-validator';
import { PollCustomOption } from '@/poll_custom_option/poll_custom_option.entity';
import { PollVote } from '@/poll-vote/poll-vote.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';

@Entity()
export class PollOption {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(_ => PollQuestion, poll => poll.pollOptions, {
		onDelete: 'CASCADE',
	})
	pollQuestion!: PollQuestion;

	@OneToOne(_ => PollCustomOption, {
		onDelete: 'CASCADE',
	})
	pollCustomOption!: PollCustomOption | null;

	@OneToMany(_ => PollVote, pollVote => pollVote.pollOption, {
		onDelete: 'CASCADE',
	})
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

	get isSubmittedByUser(): boolean {
		return this.pollCustomOption === null;
	}
}
