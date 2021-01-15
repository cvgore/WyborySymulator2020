import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import MinPollDto from '@/poll/dto/min-poll.dto';
import { plainToClass } from 'class-transformer';
import { JwtGuard } from '@/auth/guards/jwt.guard';

@Controller('poll')
export class PollController {
	constructor(private readonly pollService: PollService) {
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	async get(@Param() id: number): Promise<MinPollDto> {
		const poll = await this.pollService.findById(id);

		return plainToClass(MinPollDto, poll);
	}

	@Post('create')
	@UseGuards(JwtGuard)
	async create(): Promise<void> {

	}
}

