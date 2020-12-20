import { Column, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Receiver } from '../receiver/receiver.entity';

@Entity()
export class ReceiverGroup {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(_ => User)
	user!: User;

	@Column()
	name!: string;

	@OneToMany(_ => Receiver, receiver => receiver.receiverGroup)
	receivers!: Receiver[];
}

