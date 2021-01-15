import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreatePollDto {
	@IsString()
	@MinLength(3)
	@MaxLength(40)
	name!: string;
}
