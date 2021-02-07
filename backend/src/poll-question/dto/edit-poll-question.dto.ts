import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export default class EditPollQuestionDto {
	@IsString()
	@MinLength(3)
	@MaxLength(120)
	name!: string;

	@IsBoolean()
	required!: boolean;
}
