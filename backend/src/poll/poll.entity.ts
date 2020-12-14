import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsDate } from 'class-validator';
import { PollCodes } from '../poll_codes/poll_codes.entity';

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

	@OneToMany(_ => PollCodes, pollCode => pollCode.poll)
	pollCodes!: PollCodes[];

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
