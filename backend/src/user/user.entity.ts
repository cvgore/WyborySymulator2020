import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEmail } from 'class-validator';
import { hash } from 'argon2';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@IsEmail()
	email!: string;

	@Column({type: 'timestamp'})x
	@IsDate()
	emailVerifiedAt!: Date | null;

	@Column({type: 'timestamp'})
	@IsDate()
	createdAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	updatedAt!: Date;

	@Column()
	password!: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password);
	}

	@BeforeInsert()
	setCreatedAt() {
		this.createdAt = new Date();
	}

	@BeforeInsert()
	@BeforeUpdate()
	setUpdatedAt() {
		this.updatedAt = new Date();
	}
}
