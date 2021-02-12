import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@/core/config';
import { HttpService } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_MODULE_OPTIONS } from '@nestjs/jwt/dist/jwt.constants';
import { PollController } from '@/poll/poll.controller';
import { PollService } from '@/poll/poll.service';
import { PollVoteService } from '@/poll-vote/poll-vote.service';
import { Poll } from '@/poll/poll.entity';
import { PollVote } from '@/poll-vote/poll-vote.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import { PollOption } from '@/poll-option/poll-option.entity';
import { Repository } from 'typeorm';
import { PollAlreadyPublishedError } from '@/poll/errors/poll-already-published.error';
import { PollOptionService } from '@/poll-option/poll-option.service';
import { GoogleRecaptchaValidator } from '@/packages/recaptcha/src/services/google-recaptcha.validator';
import { RECAPTCHA_OPTIONS } from '@/packages/recaptcha/src/provider.declarations';
import { REQUEST } from '@nestjs/core';


describe('PollController', () => {
	let pollController: PollController;
	let pollService: PollService;
	let app: TestingModule;

	beforeEach(async () => {
		app = await Test.createTestingModule({
			controllers: [PollController],
			imports: [
				ConfigModule.forRoot({
					isGlobal: true,
					cache: process.env.NODE_ENV === 'production',
					load: [config]
				}),
			],
			providers: [
				PollService,
				PollVoteService,
				PollOptionService,
				ConfigService,
				{
					provide: getRepositoryToken(Poll),
					useValue: {
						count: () => 1,
						findOneOrFail: () => new Poll({
							id: 1,
							name: 'test',
							publishedAt: new Date(),
						})
					}
				},
				{
					provide: getRepositoryToken(PollVote),
					useValue: {}
				},
				{
					provide: getRepositoryToken(PollOption),
					useValue: {}
				},
				{
					provide: getRepositoryToken(PollQuestion),
					useValue: {}
				},
				GoogleRecaptchaValidator,
				HttpService,
				{
					provide: REQUEST,
					useValue: {
						user: {
							id: 1,
						}
					}
				},
				{
					provide: RECAPTCHA_OPTIONS,
					useValue: {
						secretKey: '123',
						agent: 'Jest',
					}
				},
				{
					provide: AXIOS_INSTANCE_TOKEN,
					useValue: 'jest-axios',
				},
				AuthService,
				JwtService,
				{
					provide: JWT_MODULE_OPTIONS,
					useValue: {
						secret: 'test',
						signOptions: {expiresIn: '15m'},
					}
				}
			],
		}).compile();

		pollController = app.get<PollController>(PollController);
		pollService = app.get<PollService>(PollService);
	});

	describe('root', () => {
		it('it throws error if trying to publish poll twice', async () => {
			expect(pollController.publish(1)).rejects.toThrowError(PollAlreadyPublishedError);
		});
		it('it returns poll object', async () => {
			const data = await pollController.get(1);

			expect(data).toHaveProperty("id", 1);
			expect(data).toHaveProperty("name", 'test');
			expect(data).toHaveProperty("publishedAt");
		});
	});
});
