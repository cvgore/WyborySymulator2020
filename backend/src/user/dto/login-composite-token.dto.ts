import { IsEmail, IsInt, IsUUID } from 'class-validator';

export class LoginCompositeTokenDto {
	@IsEmail()
	email!: string;

	@IsUUID('4')
	token!: string;

	@IsInt()
	ts!: number;
}

