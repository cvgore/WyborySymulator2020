import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HcaptchaModule } from './packages/recaptcha/src';
import config from '@/core/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseType } from 'typeorm';
import { User } from '@/user/user.entity';
import { CacheConfigService } from '@/cache/cache-config.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from '@/auth/auth.module';
import { PollModule } from '@/poll/poll.module';
import { Poll } from '@/poll/poll.entity';
import { PollCode } from '@/poll_code/poll_code.entity';
import { PollVote } from '@/poll_vote/poll_vote.entity';
import { PollQuestion } from '@/poll-question/poll-question.entity';
import { PollOption } from '@/poll-option/poll-option.entity';
import { PollCustomOption } from '@/poll_custom_option/poll_custom_option.entity';
import { Receiver } from '@/receiver/receiver.entity';
import { ReceiverGroup } from '@/receiver_group/receiver_group.entity';
import { Voter } from '@/voter/voter.entity';
import { PollQuestionModule } from '@/poll-question/poll-question.module';
import { PollOptionModule } from '@/poll-option/poll-option.module';

type SupportedDatabaseType = Extract<DatabaseType, 'mysql' | 'postgres'>;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: process.env.NODE_ENV === 'production',
			load: [config]
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: configService.get<SupportedDatabaseType>('db.conn')!,
				host: configService.get<string>('db.host'),
				port: configService.get<number>('db.port'),
				username: configService.get<string>('db.user'),
				password: configService.get<string>('db.pass'),
				database: configService.get<string>('db.name'),
				entities: [
					User, Poll, PollCode, PollVote, PollQuestion, PollOption, PollCustomOption, Receiver, ReceiverGroup, Voter
				],
				synchronize: configService.get<boolean>('db.sync'),
			}),
		}),
		HcaptchaModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secretKey: config.get<string>('crypto.hcaptchaSecret')!,
				response: (req: any) => req.headers['X-Captcha-Response'],
				skipIf: config.get<boolean>('isLocal'),
			}),
		}),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				transport: config.get('mail.transport'),
				defaults: {
					from: config.get('mail.from'),
				},
				template: {
					dir: __dirname + '/mail/templates',
					adapter: new PugAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
		CacheModule.registerAsync({
			useClass: CacheConfigService
		}),
		UserModule,
		AuthModule,
		PollModule,
		PollQuestionModule,
		PollOptionModule,
	],
	controllers: [AppController],
	providers: [AppService, ConfigService],
})
export class AppModule {
}
