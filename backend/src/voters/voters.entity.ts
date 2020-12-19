import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn, OneToOne } from 'typeorm/index';
import { PollCode } from '../poll_code/poll_code.entity';
import { User } from '../user/user.entity';

@Entity()
export class Voters {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(_ => PollCode)
	@JoinColumn({
		name: 'struct_id',
		referencedColumnName: 'id',
	})
	pollCode!: PollCode | null;

	@OneToOne(_ => User, {

	})
	@JoinColumn({
		name: 'struct_id',
		referencedColumnName: 'id',
	})
	user!: User | null;

	@Column()
	struct_id!: number;

	@Column({type: 'enum', enum: ['user', 'poll_code']})
	struct_type!: 'user' | 'poll_code';

	get struct(): PollCode | User | null {
		switch (this.struct_type) {
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

