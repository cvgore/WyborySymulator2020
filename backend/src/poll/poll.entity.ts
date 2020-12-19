import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsDate } from 'class-validator';
import { PollCode } from '../poll_code/poll_code.entity';
import { PollOption } from '../poll_option/poll_option.entity';

@Entity()
export class Poll {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	user_id!: number;

	@Column()
	type!: 'anonymous';

	@Column()
	colorSchema!: number;

	@OneToMany(_ => PollCode, pollCode => pollCode.poll)
	pollCodes!: PollCode[];

	@OneToMany(_ => PollCode, pollCode => pollCode.poll)
	pollOptions!: PollOption[];

	@Column({type: 'timestamp'})
	@IsDate()
	validFrom!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	validUntil!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	publishedAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	createdAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	updatedAt!: Date;
}
