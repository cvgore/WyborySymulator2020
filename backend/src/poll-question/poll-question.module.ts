import { Module } from '@nestjs/common';
import { PollQuestionService } from './poll-question.service';
import { PollQuestionController } from './poll-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollQuestion } from '@/poll-question/poll-question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([PollQuestion]),
	],
	controllers: [PollQuestionController],
	providers: [PollQuestionService],
})
export class PollQuestionModule {
}
