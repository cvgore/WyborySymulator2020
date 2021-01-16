import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from '@/poll/poll.entity';
import CreatePollDto from '@/poll/dto/create-poll.dto';
import { User } from '@/user/user.entity';
import EditPollDto from '@/poll/dto/edit-poll.dto';

@Injectable()
export class PollService {
	constructor(
		@InjectRepository(Poll) private readonly pollRepository: Repository<Poll>
	) {
	}

	async findById(id: number): Promise<Poll | undefined> {
		return await this.pollRepository.findOneOrFail(id);
	}

	async createPoll(data: CreatePollDto, user: User | number): Promise<Poll> {
		const poll = this.pollRepository.create(
			Object.assign({}, data, <Poll>{
				type: 'anonymous',
				user,
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
		await this.pollRepository.findOneOrFail(id);

		await this.pollRepository.update(id, <Poll>data);
	}
}
