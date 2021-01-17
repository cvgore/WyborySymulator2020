import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsDate } from 'class-validator';
import { PollCode } from '@/poll_code/poll_code.entity';
import { PollOption } from '@/poll-option/poll-option.entity';
import { PollVote } from '@/poll_vote/poll_vote.entity';
import { User } from '@/user/user.entity';

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

	@OneToMany(_ => PollCode, pollCode => pollCode.poll)
	pollCodes!: PollCode[];

	@OneToMany(_ => PollVote, pollVote => pollVote.poll)
	pollVotes!: PollVote[];

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
