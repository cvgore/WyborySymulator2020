import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, } from 'class-validator';
import { PollOption } from '@/poll-option/poll-option.entity';

@Entity()
export class PollVote {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(_ => PollOption, pollOption => pollOption.pollVotes, {
		onDelete: 'CASCADE',
	})
	pollOption!: PollOption;

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
