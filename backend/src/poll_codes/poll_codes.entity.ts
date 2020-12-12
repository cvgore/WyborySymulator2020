import { BeforeInsert, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsDate, } from 'class-validator';
import { Poll } from '../poll/poll.entity';
import { randomBytes } from '../core/promisified';

@Entity()
@Unique(['code'])
export class PollCodes {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(_ => Poll, poll => poll.pollCodes)
	poll!: Poll;

	@Column()
	@Index()
	code!: number;

	@Column({type: 'timestamp'})
	@IsDate()
	used_at!: Date | null;

	useCode() {
		if (this.used_at === null) {
			this.used_at = new Date();
		}
	}

	// TODO: check if is unique within database before storing
	@BeforeInsert()
	async setCode() {
		if (this.code === null) {
			const buf = await randomBytes(6);

			return buf.toString('hex').toUpperCase();
		}
	}
}

