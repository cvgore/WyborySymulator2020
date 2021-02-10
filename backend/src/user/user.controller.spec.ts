import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@/user/user.service';
import { LoginService } from '@/user/login.service';
import { CACHE_MANAGER, CacheModule, HttpService } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { GoogleRecaptchaValidator } from '@/packages/recaptcha/src/services/google-recaptcha.validator';
import { RECAPTCHA_OPTIONS } from '@/packages/recaptcha/src/provider.declarations';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_MODULE_OPTIONS } from '@nestjs/jwt/dist/jwt.constants';
import config from '@/core/config';
import { CacheConfigService } from '@/cache/cache-config.service';

process.env.REDIS_HOST = 'localhost';

describe('UserController', () => {
	let userController: UserController;
	let loginService: LoginService;
	let userService: UserService;
	let cacheManager: Cache;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			imports: [
				ConfigModule.forRoot({
					isGlobal: true,
					cache: process.env.NODE_ENV === 'production',
					load: [config]
				}),
				CacheModule.registerAsync({
					useClass: CacheConfigService
				}),
			],
			providers: [
				UserService,
				LoginService,
				ConfigService,
				{
					provide: MailerService,
					useValue: {
						sendMail: () => {
						},
					}
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

		it('authorization works if composite token is valid and returns correct token', async () => {
			const loginDto = {email: 'test@localhost'};
			const requestMockup = {
				ip: '127.0.0.1',
				headers: {
					'user-agent': 'jest',
				}
			};

			const ct = await loginService.generateLoginCompositeToken(loginDto.email);
			const data: any = await userController.authorize({...loginDto, ...ct});

			expect(data).toHaveProperty('access_token');

			const jwtData = data.access_token.split('.')[1];

			const jsonData = JSON.parse(
				Buffer
					.from(
						jwtData,
						'base64'
					)
					.toString('utf8')
			);

			expect(jsonData).toHaveProperty('username');
			expect(jsonData.username).toEqual(loginDto.email);
		});
	});
});
