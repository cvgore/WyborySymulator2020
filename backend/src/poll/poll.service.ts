import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from '@/poll/poll.entity';
import CreatePollDto from '@/poll/dto/create-poll.dto';

@Injectable()
export class PollService {
	constructor(
		@InjectRepository(Poll) private readonly pollRepository: Repository<Poll>
	) {
	}

	async findById(id: number): Promise<Poll | undefined> {
		return await this.pollRepository.findOne({
			where: {
				id
			}
		});
	}

	async createPoll(data: CreatePollDto): Promise<void> {

	}
}
