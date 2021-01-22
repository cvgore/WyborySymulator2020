import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from '@/poll/poll.entity';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';
import { REQUEST } from '@nestjs/core';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { PollAlreadyPublishedError } from '@/poll/errors/poll-already-published.error';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import PollLinkDto from '@/poll/dto/poll-link.dto';
import { PollNotPublishedError } from '@/poll/errors/poll-not-published.error';

@Injectable()
export class PollService {
	constructor(
		@InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
		private readonly configService: ConfigService,
		@Inject(REQUEST) private readonly ctx: any,
	) {
	}

	private get userId(): any {
		return this.ctx.user.id;
	}

	private hasher(): crypto.Hmac {
		return crypto.createHmac('sha1', this.configService.get('crypto.appSecret')!);
	}

	async findById(id: number): Promise<Poll> {
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

	async publishPoll(id: number): Promise<void> {
		const poll = await this.pollRepository.findOne({
			id,
			user: this.userId,
		});

		if (!poll) {
			throw new EntityNotFoundError(Poll, id);
		}

		if (poll.publishedAt) {
			throw new PollAlreadyPublishedError();
		}

		await this.pollRepository.update({
			id,
		}, {
			publishedAt: new Date(),
		});
	}

	async getLink(id: number): Promise<PollLinkDto> {
		const poll = await this.findById(id);

		if (!poll.publishedAt) {
			throw new PollNotPublishedError();
		}

		const link = this.hasher().update(`poll-link(${id}, ${+poll.publishedAt})`).digest().toString('hex');
		const appUrl = this.configService.get('app.frontUrl');

		return {
			url: `${appUrl}/vote/${link}`,
		};
	}
}
