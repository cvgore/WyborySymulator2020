import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PollCode } from '@/poll-code/poll-code.entity';
import { User } from '@/user/user.entity';

@Entity()
@Unique(['structId', 'structType'])
export class Voter {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(_ => PollCode, {
		createForeignKeyConstraints: false,
	})
	@JoinColumn({
		name: 'structId',
		referencedColumnName: 'id',
	})
	pollCode!: PollCode | null;

	@OneToOne(_ => User, {
		createForeignKeyConstraints: false,
	})
	@JoinColumn({
		name: 'structId',
		referencedColumnName: 'id',
	})
	user!: User | null;

	@Column()
	structId!: number;

	@Column({type: 'enum', enum: ['user', 'poll_code']})
	structType!: 'user' | 'poll_code';

	get struct(): PollCode | User | null {
		switch (this.structType) {
			case 'user':
				return this.user;
			case 'poll_code':
				return this.pollCode;
		}
	}

	set struct(val) {
		if (val instanceof PollCode) {
			this.pollCode = val;
		} else if (val instanceof User) {
			this.user = val;
		}
	}
}

