import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import EditPollOptionDto from '@/poll-option/dto/edit-poll-option.dto';
import { Poll } from '@/poll/poll.entity';
import CreatePollQuestionDto from '@/poll-question/dto/create-poll-question.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PollQuestionService {
	constructor(
		@InjectRepository(PollQuestion) private readonly pollQuestionRepository: Repository<PollQuestion>,
		@Inject(REQUEST) private readonly ctx: any,
	) {
	}

	private get userId(): any {
		return this.ctx.user.id;
	}

	async createQuestion(data: CreatePollQuestionDto, poll: Poll | number): Promise<PollQuestion> {
		const pollQuestion = this.pollQuestionRepository.create(
			Object.assign({}, data, <PollQuestion>{
				poll,
			})
		);

		await this.pollQuestionRepository.insert(pollQuestion);

		return pollQuestion;
	}

	async editQuestion(id: number, pollId: number, data: EditPollOptionDto): Promise<void> {
		await this.pollQuestionRepository.update({
			poll: {
				user: this.userId,
				id: pollId
			},
			id
		}, <PollQuestion>data);
	}

	async deleteQuestion(id: number, pollId: number): Promise<void> {
		await this.pollQuestionRepository.delete({
			poll: {
				user: this.userId,
				id: pollId,
			},
			id
		});
	}

	async getAll(pollId: number): Promise<PollQuestion[]> {
		return await this.pollQuestionRepository.find({
			poll: {
				user: this.userId,
				id: pollId,
			}
		});
	}
}
