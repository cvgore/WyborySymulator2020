import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollVote } from '@/poll-vote/poll-vote.entity';
import { PollVoteService } from '@/poll-vote/poll-vote.service';
import { PollOptionService } from '@/poll-option/poll-option.service';
import { PollOption } from '@/poll-option/poll-option.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([PollVote, PollOption, PollQuestion]),
	],
	providers: [PollVoteService, PollOptionService],
})
export class PollVoteModule {
}
