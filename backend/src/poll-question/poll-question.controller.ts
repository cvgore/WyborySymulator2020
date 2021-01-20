import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { PollQuestionService } from '@/poll-question/poll-question.service';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import CreatePollQuestionDto from '@/poll-question/dto/create-poll-question.dto';
import EditPollQuestionDto from '@/poll-question/dto/edit-poll-question.dto';

@Controller('poll/:pollId/question')
@UseGuards(JwtGuard)
export class PollQuestionController {
	constructor(
		private readonly pollQuestionService: PollQuestionService
	) {
	}

	@Get('/')
	async index(@Param('pollId') pollId: number): Promise<PollQuestion[]> {
		return await this.pollQuestionService.getAll(pollId);
	}

	@Post('/')
	async create(@Body() data: CreatePollQuestionDto, @Param('pollId') pollId: number): Promise<PollQuestion> {
		return await this.pollQuestionService.createQuestion(data, pollId);
	}

	@Put(':id')
	@UseGuards(JwtGuard)
	async edit(
		@Param('id') id: number,
		@Body() data: EditPollQuestionDto,
		@Param('pollId') pollId: number
	): Promise<void> {
		await this.pollQuestionService.editQuestion(id, pollId, data);
	}


	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtGuard)
	async delete(@Param('id') id: number, @Param('pollId') pollId: number): Promise<void> {
		await this.pollQuestionService.deleteQuestion(id, pollId);
	}
}

