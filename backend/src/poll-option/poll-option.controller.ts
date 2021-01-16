import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MinPollDto } from './dto/min-poll.dto';
import { plainToClass } from 'class-transformer';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';
import { PollOptionService } from '@/poll-option/poll-option.service';

@Controller('poll/:pollId/')
export class PollOptionController {
	constructor(private readonly pollOptionService: PollOptionService) {
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	async get(@Param('id') id: number): Promise<MinPollDto> {
		const poll = await this.pollOptionService.findById(id);

		return plainToClass(MinPollDto, poll);
	}

	@Post('/')
	@UseGuards(JwtGuard)
	async create(@Body() data: CreatePollDto, @Req() req: any): Promise<MinPollDto> {
		const poll = await this.pollOptionService.createPoll(data, req.user.userId);

		return plainToClass(MinPollDto, poll);
	}

	@Put(':id')
	@UseGuards(JwtGuard)
	async edit(@Param('id') id: number, @Body() data: EditPollDto): Promise<void> {
		await this.pollOptionService.editPoll(id, data);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtGuard)
	async delete(@Param('id') id: number): Promise<void> {
		await this.pollOptionService.deletePoll(id);
	}
}

