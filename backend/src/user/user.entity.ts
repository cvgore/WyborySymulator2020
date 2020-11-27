import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsEmail()
	email: string;

	@Column()
	@IsDate()
	emailVerifiedAt: Date | null;

	@Column()
	@IsDate()
	createdAt: Date;

	@Column()
	@IsDate()
	updatedAt: Date;

	@Column()
	password: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await argon2.hash(this.password);
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
