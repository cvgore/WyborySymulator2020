import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Receiver_groupEntity} from "../receiver_group/receiver_group.entity";

@Entity('receivers')
export class ReceiversEntity {
	@PrimaryGeneratedColumn()
	id!: number;
	@OneToOne(type => Receiver_groupEntity)
	receiver_group!: Receiver_groupEntity;
	@Column()
	email!: string;
}

