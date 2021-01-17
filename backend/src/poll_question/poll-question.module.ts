import { Module } from '@nestjs/common';
import { PollOptionService } from './poll-question.service';
import { PollOptionController } from './poll-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOption } from '@/poll-option/poll-option.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([PollOption]),
	],
	controllers: [PollOptionController],
	providers: [PollOptionService],
})
export class PollOptionModule {
}
