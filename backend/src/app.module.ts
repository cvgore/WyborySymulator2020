import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HcaptchaModule } from './packages/recaptcha/src';
// @ts-ignore
import * as RedisStore from 'cache-manager-redis-store';
import config from '@/core/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

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
			useFactory: (configService: ConfigService) => ({
				type: configService.get<SupportedDatabaseType>('db.conn')!,
				host: configService.get<string>('db.host'),
				port: configService.get<number>('db.port'),
				username: configService.get<string>('db.user'),
				password: configService.get<string>('db.pass'),
				database: configService.get<string>('db.name'),
				entities: [`dist/**/*.entity.js`],
				synchronize: configService.get<boolean>('db.sync'),
			}),
			inject: [ConfigService],
		}),
		HcaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				secretKey: config.get<string>('crypto.hcaptchaSecret')!,
				response: (req: any) => req.headers['X-Captcha-Response'],
				skipIf: config.get<boolean>('isLocal'),
			}),
			inject: [ConfigService],
		}),
		CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				store: RedisStore,
				host: config.get<string>('redis.host'),
				port: config.get<number>('redis.port'),
				db: config.get<number>('redis.db'),
				password: config.get<string>('redis.pass'),
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
