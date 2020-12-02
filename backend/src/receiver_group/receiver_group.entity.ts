import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';


@Entity('receiver_group')
export class Receiver_groupEntity {
	@PrimaryGeneratedColumn()
	id!: number;
	@OneToOne(type => User)
	user!: User;
	@Column()
	name!: string;
}

