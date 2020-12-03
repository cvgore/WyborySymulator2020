import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'
@Entity()
export class Voters{
	@PrimaryGeneratedColumn()
	id!: number;
	@Column()
	struct_id!: number;
	@Column()
	struct_type!: number;

}

