import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Voter } from '../voter/voter.entity';
import { PollOption } from '../poll_option/poll_option.entity';

@Entity()
export class PollCustomOption {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(_ => PollOption, pollOption => pollOption.pollCustomOption)
	pollOption!: PollOption;

	@ManyToOne(_ => Voter)
	voter!: Voter;
}

