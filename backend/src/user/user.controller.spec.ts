import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@/user/user.service';
import { LoginService } from '@/user/login.service';
import { CACHE_MANAGER, HttpService } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { GoogleRecaptchaValidator } from '@/packages/recaptcha/src/services/google-recaptcha.validator';
import { GoogleRecaptchaGuard } from '@/packages/recaptcha/src';
import { RECAPTCHA_OPTIONS } from '@/packages/recaptcha/src/provider.declarations';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_MODULE_OPTIONS } from '@nestjs/jwt/dist/jwt.constants';

describe('UserController', () => {
	let userController: UserController;
	let loginService: LoginService;
	let userService: UserService;
	let cacheManager: Cache;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				UserService,
				LoginService,
				ConfigService,
				{
					provide: MailerService,
					useValue: {
						sendMail: () => {},
					}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {
						set: () => {},
					},
				},
				{
					provide: getRepositoryToken(User),
					useValue: {
						count: () => 1,
						findOne: () => new User({
							email: 'test@localhost',
							id: 1,
						}),
					}
				},
				GoogleRecaptchaValidator,
				HttpService,
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

		userController = app.get<UserController>(UserController);
		loginService = app.get<LoginService>(LoginService);
		userService = app.get<UserService>(UserService);
		cacheManager = app.get<Cache>(CACHE_MANAGER);
	});

	describe('root', () => {
		it('should insert login data into db', () => {
			jest.spyOn(loginService, 'cacheKey').mockImplementation(() => 'test');
			const loginDto = {email: 'test@localhost'};
			const requestMockup = {
				ip: '127.0.0.1',
				headers: {
					'user-agent': 'jest',
				}
			};

			expect(userController.requestLogin(loginDto, requestMockup)).resolves.toBeUndefined();
		});
	});
});
