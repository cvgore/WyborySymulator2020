import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreatePollOptionDto {
	@IsString()
	@MinLength(3)
	@MaxLength(120)
	name!: string;
}
