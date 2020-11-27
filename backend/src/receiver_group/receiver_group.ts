import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('receiver_group')
export class receiver_group_Entity{
	@PrimaryGeneratedColumn()
	id!: number;
	@OneToOne(type => userEntity)
	user!: userEntity;
	@Column()
	name!: string;

}

