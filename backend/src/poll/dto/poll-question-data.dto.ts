import { PollOptionDataDto } from '@/poll/dto/poll-option-data.dto';

export class PollQuestionDataDto {
	name!: string;
	type!: string;
	required!: boolean;
	options!: PollOptionDataDto[];
}
