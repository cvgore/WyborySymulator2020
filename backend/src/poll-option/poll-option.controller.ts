import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { PollOptionService } from '@/poll-option/poll-option.service';
import CreatePollQuestionDto from '@/poll-question/dto/create-poll-question.dto';
import { PollOption } from '@/poll-option/poll-option.entity';
import EditPollOptionDto from '@/poll-option/dto/edit-poll-option.dto';

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
	async create(@Body() data: CreatePollQuestionDto, @Param('pollQuestionId') pollQuestionId: number): Promise<PollOption> {
		return await this.pollOptionService.createOption(data, pollQuestionId);
	}

	//
	@Put(':id')
	@UseGuards(JwtGuard)
	async edit(
		@Param('id') id: number,
		@Body() data: EditPollOptionDto,
		@Param('pollQuestionId') pollQuestionId: number
	): Promise<void> {
		await this.pollOptionService.editOption(id, pollQuestionId, data);
	}


	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtGuard)
	async delete(@Param('id') id: number, @Param('pollQuestionId') pollQuestionId: number): Promise<void> {
		await this.pollOptionService.deleteOption(id, pollQuestionId);
	}
}

