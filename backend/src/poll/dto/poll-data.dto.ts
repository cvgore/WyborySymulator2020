import { PollQuestionDataDto } from '@/poll/dto/poll-question-data.dto';

export class PollDataDto {
	name!: string;
	questions!: PollQuestionDataDto[];
}
