import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsPasswordComplexityFulfilled } from '@/core/validation-rules/IsPasswordComplexityFulfilled';

export class CreateUserDto {
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsPasswordComplexityFulfilled()
	password!: string;
}
