import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollOption } from '@/poll-option/poll-option.entity';
import CreatePollOptionDto from '@/poll-option/dto/create-poll-option.dto';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import EditPollOptionDto from '@/poll-option/dto/edit-poll-option.dto';
import { PollAlreadyPublishedError } from '@/poll/errors/poll-already-published.error';

@Injectable()
export class PollOptionService {
	constructor(
		@InjectRepository(PollOption) private readonly pollOptionRepository: Repository<PollOption>,
		@InjectRepository(PollQuestion) private readonly pollQuestionRepository: Repository<PollQuestion>,
	) {
	}

	async getAll(pollQuestionId: number): Promise<PollOption[]> {
		return await this.pollOptionRepository.find({
			pollQuestion: {
				id: pollQuestionId,
			}
		});
	}

	async findById(pollQuestionId: number, id: number): Promise<PollOption> {
		return await this.pollOptionRepository.findOneOrFail({
			pollQuestion: {
				id: pollQuestionId,
			},
			id,
		});
	}

	async createOption(data: CreatePollOptionDto, pollQuestionId: number, force: boolean = false): Promise<PollOption> {
		const pollQuestion = await this.pollQuestionRepository.findOneOrFail({
			relations: ['poll'],
			where: {
				id: pollQuestionId
			}
		});

		if (!force && pollQuestion.poll.publishedAt) {
			throw new PollAlreadyPublishedError();
		}

		const pollOption = this.pollOptionRepository.create(
			Object.assign({}, data, <PollOption>{
				pollQuestion
			})
		);

		await this.pollOptionRepository.insert(pollOption);

		return pollOption;
	}

	async editOption(id: number, pollQuestionId: number, data: EditPollOptionDto): Promise<void> {
		const pollQuestion = await this.pollQuestionRepository.findOneOrFail({
			relations: ['poll'],
			where: {
				id: pollQuestionId
			}
		});

		if (pollQuestion.poll.publishedAt) {
			throw new PollAlreadyPublishedError();
		}

		await this.pollOptionRepository.update({
			id,
			pollQuestion: {
				id: pollQuestionId,
			}
		}, <PollOption>data);
	}

	async deleteOption(id: number, pollQuestionId: number): Promise<void> {
		const pollQuestion = await this.pollQuestionRepository.findOneOrFail({
			relations: ['poll'],
			where: {
				id: pollQuestionId
			}
		});

		if (pollQuestion.poll.publishedAt) {
			throw new PollAlreadyPublishedError();
		}

		await this.pollOptionRepository.delete({
			id,
			pollQuestion: {
				id: pollQuestionId
			}
		});
	}
}
