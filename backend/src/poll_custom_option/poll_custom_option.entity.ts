import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Voter } from '@/voter/voter.entity';
import { PollOption } from '@/poll-option/poll-option.entity';

@Entity()
export class PollCustomOption {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(_ => PollOption, pollOption => pollOption.pollCustomOption, {
		onDelete: 'CASCADE',
	})
	pollOption!: PollOption;

	@ManyToOne(_ => Voter)
	voter!: Voter;
}

