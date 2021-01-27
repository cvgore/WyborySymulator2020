import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from '@/poll/poll.entity';
import { PollVoteService } from '@/poll-vote/poll-vote.service';
import { PollVote } from '@/poll-vote/poll-vote.entity';
import { PollOptionService } from '@/poll-option/poll-option.service';
import { PollOption } from '@/poll-option/poll-option.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Poll, PollVote, PollOption, PollQuestion]),
	],
	controllers: [PollController],
	providers: [PollService, PollVoteService, PollOptionService],
})
export class PollModule {
}
