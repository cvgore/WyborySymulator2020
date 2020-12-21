import { IsEmail, IsInt, IsUUID } from 'class-validator';

export class LoginUserTwoFactorDto {
	@IsEmail()
	email!: string;

	@IsUUID('4')
	token!: string;

	@IsInt()
	ts!: number;
}

