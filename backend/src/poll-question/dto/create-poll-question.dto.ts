import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreatePollQuestionDto {
	@IsString()
	@MinLength(3)
	@MaxLength(120)
	name!: string;

	@IsEnum(['single', 'string'])
	type!: 'single' | 'string';
}
