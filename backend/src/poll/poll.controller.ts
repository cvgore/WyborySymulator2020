import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { MinPollDto } from './dto/min-poll.dto';
import { plainToClass } from 'class-transformer';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';

@Controller('poll')
export class PollController {
	constructor(private readonly pollService: PollService) {
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	async get(@Param('id') id: number): Promise<MinPollDto> {
		const poll = await this.pollService.findById(id);

		return plainToClass(MinPollDto, poll);
	}

	@Post('/')
	@UseGuards(JwtGuard)
	async create(@Body() data: CreatePollDto, @Req() req: any): Promise<MinPollDto> {
		const poll = await this.pollService.createPoll(data, req.user.userId);

		return plainToClass(MinPollDto, poll);
	}

	@Put(':id')
	@UseGuards(JwtGuard)
	async edit(@Param('id') id: number, @Body() data: EditPollDto): Promise<void> {
		const poll = await this.pollService.editPoll(id, data);
	}
}

