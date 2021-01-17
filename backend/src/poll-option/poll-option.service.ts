import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollOption } from '@/poll-option/poll-option.entity';
import CreatePollOptionDto from '@/poll-option/dto/create-poll-option.dto';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import EditPollOptionDto from '@/poll-option/dto/edit-poll-option.dto';

@Injectable()
export class PollOptionService {
	constructor(
		@InjectRepository(PollOption) private readonly pollOptionRepository: Repository<PollOption>
	) {
	}

	async getAll(pollQuestionId: number): Promise<PollOption[]> {
		return await this.pollOptionRepository.find({
			pollQuestion: {
				id: pollQuestionId,
			}
		});
	}

	async createOption(data: CreatePollOptionDto, pollQuestion: PollQuestion | number): Promise<PollOption> {
		const pollOption = this.pollOptionRepository.create(
			Object.assign({}, data, <PollOption>{
				pollQuestion
			})
		);

		await this.pollOptionRepository.insert(pollOption);

		return pollOption;
	}

	async editOption(id: number, pollQuestionId: number, data: EditPollOptionDto): Promise<void> {
		await this.pollOptionRepository.update({
			id,
			pollQuestion: {
				id: pollQuestionId,
			}
		}, <PollOption>data);
	}

	async deleteOption(id: number, pollQuestionId: number): Promise<void> {
		await this.pollOptionRepository.delete({
			id,
			pollQuestion: {
				id: pollQuestionId
			}
		});
	}
}
