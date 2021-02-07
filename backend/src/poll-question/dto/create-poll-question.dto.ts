import { IsBoolean, IsEnum, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreatePollQuestionDto {
	@IsString()
	@MinLength(3)
	@MaxLength(120)
	name!: string;

	@IsIn(['enum', 'text', 'number'])
	type!: string;

	@IsBoolean()
	required!: boolean;
}
