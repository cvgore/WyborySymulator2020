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
		}) > 0;
	}

	async findByEmailOrCreate(email: string): Promise<User> {
		let user = await this.usersRepository.findOne(void 0, {
			where: {
				email
			}
		});


		if (user === undefined) {

			console.log('creating user', email, user);
			user = await this.usersRepository.create({
				email
			});

			await this.usersRepository.save(user);
		}

		return user!;
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
