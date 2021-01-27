import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Poll } from '@/poll/poll.entity';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';
import { REQUEST } from '@nestjs/core';
import { PollAlreadyPublishedError } from '@/poll/errors/poll-already-published.error';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import PollLinkDto from '@/poll/dto/poll-link.dto';
import { PollNotPublishedError } from '@/poll/errors/poll-not-published.error';
import VotePollDto from '@/poll/dto/vote-poll.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import { isString, maxLength } from 'class-validator';
import { PollMissingRequiredQuestionError } from '@/poll/errors/poll-missing-required-question.error';

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

	private getLinkHash(poll: Poll): string {
		return this.hasher().update(`poll-link(${poll.id}, ${+poll.publishedAt!})`).digest().toString('hex');
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
		const poll = await this.pollRepository.findOneOrFail(id);

		if (poll.publishedAt) {
			throw new PollAlreadyPublishedError();
		}

		await this.pollRepository.update({
			id,
			user: this.userId,
			publishedAt: Not(IsNull()),
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
		const poll = await this.pollRepository.findOneOrFail({
			where: {
				id,
				user: this.userId,
			},
			relations: ['pollQuestions'],
		});

		if (poll.publishedAt) {
			throw new PollAlreadyPublishedError();
		}

		if (poll.pollQuestions.filter(q => q.required).length === 0) {
			throw new PollMissingRequiredQuestionError();
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

		const link = this.getLinkHash(poll);
		const appUrl = this.configService.get<string>('app.frontUrl')!;

		return {
			url: `${appUrl}/vote/${id}/${link}`,
		};
	}

	async validateVotePoll(pollId: number, hash: string, votePollDto: VotePollDto): Promise<void> {
		const poll = await this.pollRepository.findOneOrFail({
			relations: ['pollQuestions', 'pollQuestions.pollOptions'],
			where: [
				{
					id: pollId,
					publishedAt: Not(IsNull()),
					validUntil: IsNull(),
					validFrom: LessThanOrEqual(new Date()),
				},
				{
					id: pollId,
					publishedAt: Not(IsNull()),
					validUntil: MoreThanOrEqual(new Date()),
					validFrom: LessThanOrEqual(new Date())
				}
			]
		});

		if (hash !== this.getLinkHash(poll)) {
			throw new EntityNotFoundError(Poll, {
				pollId, hash
			});
		}

		const validKeys = poll.pollQuestions.map(q => q.id.toString(10));

		for (const voteKey in votePollDto) {
			if (!votePollDto.hasOwnProperty(voteKey)) {
				continue;
			}

			const validateError = (why: string): UnprocessableEntityException => {
				return new UnprocessableEntityException({
					[voteKey]: why
				});
			};

			if (!validKeys.includes(voteKey)) {
				throw validateError('invalid key');
			}

			const question = poll.pollQuestions.find(q => q.id.toString(10) === voteKey)!;
			const unfilteredValue = (!Array.isArray(votePollDto[voteKey]) ? [votePollDto[voteKey]] : votePollDto[voteKey]) as string[];
			const data = unfilteredValue.filter(x => x);

			if (question.required && data.length === 0) {
				throw validateError('field is required');
			}

			const validateEnum = (data: unknown[], question: PollQuestion): void => {
				const options = question.pollOptions;

				if (data.filter(x => !['number', 'string'].includes(typeof x)).length > 0) {
					throw validateError('can contain only numbers or strings');
				}

				const invalid = data.filter(x => options.find(y => y.name === x) === null);

				if (invalid.length > 0) {
					throw validateError(`invalid enum options: ${invalid.join(', ')}`);
				}
			};

			const validateText = (data: unknown[], question: PollQuestion): void => {
				if (data.length > 1) {
					throw validateError('maximum number of options is 1');
				}

				const value = data[0];

				if (!isString(value)) {
					throw validateError('expected string at index 0');
				}

				if (!maxLength(value, 2 ** 16)) {
					throw validateError(`string is too long, max is ${2 ** 16}`);
				}
			};

			const validateNumber = (data: unknown[], question: PollQuestion): void => {
				if (data.length > 1) {
					throw validateError('maximum number of options is 1');
				}

				const value = data[0];

				if (typeof value !== 'number') {
					throw validateError('expected number at index 0');
				}
			};

			switch (question.type) {
				case 'enum':
					validateEnum(data, question);
					break;
				case 'text':
					validateText(data, question);
					break;
				case 'number':
					validateNumber(data, question);
					break;
				default:
					throw new Error(`Unknown question type "${question.type}", this should not happen`);
			}
		}
	}
}
