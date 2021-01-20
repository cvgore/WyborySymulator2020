import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from '@/poll/poll.entity';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PollService {
	constructor(
		@InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
		@Inject(REQUEST) private readonly ctx: any,
	) {
	}

	private get userId(): any {
		return this.ctx.user.id;
	}

	async findById(id: number): Promise<Poll | undefined> {
		return await this.pollRepository.findOneOrFail({
			id,
			user: this.userId,
		});
	}

	async createPoll(data: CreatePollDto): Promise<Poll> {
		const poll = this.pollRepository.create(
			Object.assign({}, data, <Poll>{
				type: 'anonymous',
				user: this.userId,
				colorSchema: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				validFrom: new Date(),
			})
		);

		await this.pollRepository.insert(poll);

		return poll;
	}

	async editPoll(id: number, data: EditPollDto): Promise<void> {
		await this.pollRepository.update({
			id,
			user: this.userId
		}, <Poll>data);
	}

	async deletePoll(id: number): Promise<void> {
		await this.pollRepository.delete({
			id,
			user: this.userId,
		});
	}

	async getAll(): Promise<Poll[]> {
		return this.pollRepository.find({
			user: this.userId
		});
	}
}
