import { IsEmail, IsInt, IsNumberString, IsUUID } from 'class-validator';

export class LoginCompositeTokenDto {
	@IsEmail()
	email!: string;

	@IsUUID('4')
	token!: string;

	@IsNumberString({
		no_symbols: true
	})
	ts!: string | number;
}

