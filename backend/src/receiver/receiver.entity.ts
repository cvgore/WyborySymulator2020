import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReceiverGroup } from '../receiver_group/receiver_group.entity';

@Entity()
export class Receiver {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(_ => ReceiverGroup)
	receiverGroup!: ReceiverGroup;

	@Column()
	email!: string;
}

