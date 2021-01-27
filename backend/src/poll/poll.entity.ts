import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { PollCode } from '@/poll-code/poll-code.entity';
import { PollVote } from '@/poll-vote/poll-vote.entity';
import { User } from '@/user/user.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';

@Entity()
export class Poll {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@ManyToOne(_ => User)
	user!: User;

	@Column()
	type!: 'anonymous';

	@Column()
	colorSchema!: number;

	@OneToMany(_ => PollQuestion, pollQuestion => pollQuestion.poll)
	pollQuestions!: PollQuestion[];

	@OneToMany(_ => PollCode, pollCode => pollCode.poll)
	pollCodes!: PollCode[];

	@Column({type: 'timestamp'})
	@IsDate()
	validFrom!: Date;

	@Column({type: 'timestamp', nullable: true})
	@IsDate()
	validUntil!: Date | null;

	@Column({type: 'timestamp', nullable: true})
	@IsDate()
	publishedAt!: Date | null;

	@Column({type: 'timestamp'})
	@IsDate()
	createdAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	updatedAt!: Date;
}
