import { IsString, MaxLength, MinLength } from 'class-validator';

export default class EditPollOptionDto {
	@IsString()
	@MinLength(3)
	@MaxLength(120)
	name!: string;
}
