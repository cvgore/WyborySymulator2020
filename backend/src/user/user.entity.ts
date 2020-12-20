import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';
import { IsDate, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { hash } from 'argon2';
import { toHashids } from '@/core/helpers/hashids';

@Entity()
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

	@Expose()
	get safeId(): string {
		return toHashids(this.id);
	}
}
