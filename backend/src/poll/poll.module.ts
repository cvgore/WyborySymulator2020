import { Module } from '@nestjs/common';
import { PollService } from '@/poll/poll.service';
import { PollController } from '@/poll/poll.controller';

@Module({
	imports: [],
	controllers: [PollController],
	providers: [PollService],
})
export class PollModule {
}
