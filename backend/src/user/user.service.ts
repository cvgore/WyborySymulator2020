import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {
	}

	async existsByEmail(email: string): Promise<boolean> {
		return await this.usersRepository.count({
			where: {
				email
			},
		}) > 1;
	}

	findOne(id: string): Promise<User | undefined> {
		return this.usersRepository.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
