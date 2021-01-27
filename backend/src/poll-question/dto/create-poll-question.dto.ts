import { IsBoolean, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreatePollQuestionDto {
	@IsString()
	@MinLength(3)
	@MaxLength(120)
	name!: string;

	@IsEnum(['enum', 'text', 'number'])
	type!: string;

	@IsBoolean()
	required!: boolean;
}
