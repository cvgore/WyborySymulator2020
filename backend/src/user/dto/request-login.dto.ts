import { IsEmail } from 'class-validator';

export class RequestLoginDto {
	@IsEmail()
	email!: string;
}
