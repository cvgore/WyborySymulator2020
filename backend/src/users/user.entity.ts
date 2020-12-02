import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';
import { IsDate, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { hash } from 'argon2';
import { Inject } from '@nestjs/common';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	@Exclude({toPlainOnly: true})
	id!: number;

	@Column()
	@IsEmail()
	email!: string;

	@Column({type: 'timestamp'})
	@IsDate()
	@Exclude({toPlainOnly: true})
	emailVerifiedAt!: Date | null;

	@Column({type: 'timestamp'})
	@IsDate()
	createdAt!: Date;

	@Column({type: 'timestamp'})
	@IsDate()
	updatedAt!: Date;

	@Column()
	@Exclude()
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

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}

	@Expose({toPlainOnly: true})
	get isEmailVerified(): boolean {
		return this.emailVerifiedAt !== null;
	}

	get safeId(): string {
		return hashids
	}
}
