import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "../user/user.entity";

@Entity('receiver_group')
export class Receiver_groupEntity {
	@PrimaryGeneratedColumn()
	id!: number;
	@OneToOne(type => UserEntity)
	user!: UserEntity;
	@Column()
	name!: string;
}

