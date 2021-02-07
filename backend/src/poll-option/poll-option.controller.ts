import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { PollOptionService } from '@/poll-option/poll-option.service';
import { PollOption } from '@/poll-option/poll-option.entity';
import EditPollOptionDto from '@/poll-option/dto/edit-poll-option.dto';
import CreatePollOptionDto from '@/poll-option/dto/create-poll-option.dto';

@Controller('poll/:pollId/question/:questionId/option')
@UseGuards(JwtGuard)
export class PollOptionController {
	constructor(
		private readonly pollOptionService: PollOptionService,
	) {
	}

	@Get('/')
	async index(@Param('pollId') pollId: number): Promise<PollOption[]> {
		return await this.pollOptionService.getAll(pollId);
	}

	@Post('/')
	async create(@Body() data: CreatePollOptionDto, @Param('questionId') pollQuestionId: number): Promise<PollOption> {
		return await this.pollOptionService.createOption(data, pollQuestionId);
	}

	//
	@Put(':id')
	async edit(
		@Param('id') id: number,
		@Body() data: EditPollOptionDto,
		@Param('questionId') pollQuestionId: number
	): Promise<void> {
		await this.pollOptionService.editOption(id, pollQuestionId, data);
	}


	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: number, @Param('questionId') pollQuestionId: number): Promise<void> {
		await this.pollOptionService.deleteOption(id, pollQuestionId);
	}
}

