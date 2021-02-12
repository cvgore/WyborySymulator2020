import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import EditPollDto from '@/poll/dto/edit-poll.dto';
import { Poll } from '@/poll/poll.entity';
import PollLinkDto from '@/poll/dto/poll-link.dto';
import VotePollDto from '@/poll/dto/vote-poll.dto';
import { Recaptcha } from '@/packages/recaptcha/src';
import { PollVoteService } from '@/poll-vote/poll-vote.service';

@Controller('poll')
export class PollController {
	constructor(
		private readonly pollService: PollService,
		private readonly pollVoteService: PollVoteService,
	) {
	}

	@Get('/')
	@UseGuards(JwtGuard)
	async list(): Promise<Poll[]> {
		return await this.pollService.getAll();
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	async get(@Param('id') id: number): Promise<Poll | undefined> {
		return await this.pollService.findById(id);
	}

	@Post('/')
	@UseGuards(JwtGuard)
	async create(@Body() data: CreatePollDto, @Req() req: any): Promise<Poll> {
		return await this.pollService.createPoll(data);
	}

	@Put(':id')
	@UseGuards(JwtGuard)
	async edit(@Param('id') id: number, @Body() data: EditPollDto): Promise<void> {
		await this.pollService.editPoll(id, data);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtGuard)
	async delete(@Param('id') id: number): Promise<void> {
		await this.pollService.deletePoll(id);
	}

	@Post(':id/publish')
	@UseGuards(JwtGuard)
	async publish(@Param('id') id: number): Promise<void> {
		await this.pollService.publishPoll(id);
	}

	@Get(':id/link')
	@UseGuards(JwtGuard)
	async link(@Param('id') id: number): Promise<PollLinkDto> {
		return await this.pollService.getLink(id);
	}

	@Get(':id/:hash/data')
	@Recaptcha()
	async data(
		@Param('id') id: number,
		@Param('hash') hash: string,
	): Promise<Poll> {
		return await this.pollService.getPollData(id, hash);
	}

	@Post(':id/:hash/vote')
	@Recaptcha()
	async vote(
		@Param('id') id: number,
		@Param('hash') hash: string,
		@Body() votePoll: VotePollDto
	): Promise<void> {
		await this.pollService.validateVotePoll(id, hash, votePoll);

		const pollQuestions = await this.pollService.getPollQuestions(id);

		for (const votePollKey in votePoll) {
			if (!votePoll.hasOwnProperty(votePollKey)) {
				continue;
			}

			const data = votePoll[votePollKey];
			const pollQuestion = pollQuestions.find(q => q.id.toString(10) === votePollKey)!;

			if (pollQuestion.type === 'enum') {
				for (const datum of data) {
					await this.pollVoteService.createVote(pollQuestion.id, <number>datum);
				}
			} else {
				await this.pollVoteService.createVoteAndOption(pollQuestion.id, data[0]);
			}
		}
	}

	@Get(':id/votes')
	@UseGuards(JwtGuard)
	async votes(@Param('id') id: number): Promise<any> {
		const votes = await this.pollService.getVotes(id);

		return votes.map(v => v.pollOption.name).reduce((acc: { [key: string]: number }, val) => {
			if (typeof acc[val] === 'undefined') {
				acc[val] = -1;
			}

			acc[val]++;

			return acc;
		}, {});
	}
}

