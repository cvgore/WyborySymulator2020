import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PollVote } from '@/poll-vote/poll-vote.entity';
import { PollOptionService } from '@/poll-option/poll-option.service';

@Injectable()
export class PollVoteService {
	constructor(
		@InjectRepository(PollVote) private readonly pollVoteRepository: Repository<PollVote>,
		private readonly pollOptionService: PollOptionService,
		private readonly configService: ConfigService,
		@Inject(REQUEST) private readonly ctx: any,
	) {
	}

	async createVote(pollQuestionId: number, optionId: number): Promise<void> {
		const pollOption = await this.pollOptionService.findById(pollQuestionId, optionId);

		const vote = await this.pollVoteRepository.create({
			pollOption,
		});

		await this.pollVoteRepository.insert(vote);
	}

	async createVoteAndOption(pollQuestionId: number, name: any): Promise<void> {
		const pollOption = await this.pollOptionService.createOption({
			name,
		}, pollQuestionId, true);

		await this.createVote(pollQuestionId, pollOption.id);
	}
}
