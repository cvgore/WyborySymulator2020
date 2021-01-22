import { Module } from '@nestjs/common';
import { PollOptionService } from './poll-option.service';
import { PollOptionController } from './poll-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOption } from '@/poll-option/poll-option.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([PollOption, PollQuestion]),
	],
	controllers: [PollOptionController],
	providers: [PollOptionService],
})
export class PollOptionModule {
}
