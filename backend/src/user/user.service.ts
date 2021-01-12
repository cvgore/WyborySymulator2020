import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import CompositeToken from '@/user/composite-token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		private readonly config: ConfigService,
		private readonly mailerService: MailerService
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

	async sendLoginEmail(email: string, composite: CompositeToken): Promise<void> {
		const appName = this.config.get('app.name');
		const appUrl = this.config.get('app.url');

		const exists = await this.existsByEmail(email);
		const subject = exists
			? 'Login requested to ' + appName
			: 'Welcome to ' + appName;
		const template = exists ? 'login' : 'register';
		const compositeUrl = Buffer.from(JSON.stringify(composite)).toString('base64');
		await this.mailerService.sendMail({
			to: email,
			subject,
			template,
			context: {
				email,
				composite: compositeUrl,
				appName,
				url: `${appUrl}/user/login#` + compositeUrl,
				time: this.config.get('auth.magicLink.lifetime') / 60,
			}
		});
	}
}
