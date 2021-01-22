import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';
import { Poll } from '@/poll/poll.entity';
import PollLinkDto from '@/poll/dto/poll-link.dto';

@Controller('poll')
@UseGuards(JwtGuard)
export class PollController {
	constructor(
		private readonly pollService: PollService
	) {
	}

	@Get('/')
	async list(): Promise<Poll[]> {
		return await this.pollService.getAll();
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	async get(@Param('id') id: number): Promise<Poll | undefined> {
		return await this.pollService.findById(id);
	}

	@Post('/')
	@UseGuards(JwtGuard)
	async create(@Body() data: CreatePollDto, @Req() req: any): Promise<Poll> {
		return await this.pollService.createPoll(data);
	}

	@Put(':id')
	@UseGuards(JwtGuard)
	async edit(@Param('id') id: number, @Body() data: EditPollDto): Promise<void> {
		await this.pollService.editPoll(id, data);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtGuard)
	async delete(@Param('id') id: number): Promise<void> {
		await this.pollService.deletePoll(id);
	}

	@Post(':id/publish')
	@UseGuards(JwtGuard)
	async publish(@Param('id') id: number): Promise<void> {
		await this.pollService.publishPoll(id);
	}

	@Get(':id/link')
	@UseGuards(JwtGuard)
	async link(@Param('id') id: number): Promise<PollLinkDto> {
		return await this.pollService.getLink(id);
	}

	@Get(':id/link')
	@UseGuards(JwtGuard)
	async vote(@Param('id') id: number): Promise<PollLinkDto> {
		return await this.pollService.getLink(id);
	}
}

