import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollOption } from '@/poll-option/poll-option.entity';
import CreatePollOptionDto from '@/poll-option/dto/create-poll-option.dto';
import { PollQuestion } from '@/poll_question/poll_question.entity';
import EditPollOptionDto from '@/poll-option/dto/edit-poll-option.dto';

@Injectable()
export class PollOptionService {
	constructor(
		@InjectRepository(PollOption) private readonly pollOptionRepository: Repository<PollOption>
	) {
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

	async editOption(id: number, data: EditPollOptionDto): Promise<void> {
		await this.pollOptionRepository.update(id, <PollOption>data);
	}

	async deleteOption(id: number): Promise<void> {
		await this.pollOptionRepository.delete(id);
	}
}
