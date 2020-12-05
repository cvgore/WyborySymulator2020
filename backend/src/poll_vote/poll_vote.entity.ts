import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsDate,} from 'class-validator';
import {PollQuestion} from "../poll_question/poll_question.entity";

@Entity()
export class PollVote {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	poll_id!: number;

	@ManyToOne(_ => PollQuestion, pollQuestion => pollQuestion.pollVotes)
	pollQuestion!: PollQuestion;

	@Column()
	poll_option_id!: number;

	@Column({type: "timestamp"})
	@IsDate()
	createdAt!: Date;

	@Column({type: "timestamp"})
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
