import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ReceiverGroup} from "../receiver_group/receiver_group.entity";


@Entity()
export class Receivers {
	@PrimaryGeneratedColumn()
	id!: number;
	@OneToOne(type => ReceiverGroup)
	receiver_group!: ReceiverGroup;
	@Column()
	email!: string;

}

