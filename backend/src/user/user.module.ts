import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { LoginService } from '@/user/login.service';
import { ConfigModule } from '@nestjs/config';
import { CacheConfigService } from '@/cache/cache-config.service';
import rateLimit from 'express-rate-limit';
import { AuthModule } from '@/auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		CacheModule.registerAsync({
			imports: [ConfigModule],
			// FIXME: useExisting should work and is much more expected there, but for some reason it does not work
			useClass: CacheConfigService,
		}),
		AuthModule,
	],
	controllers: [UserController],
	providers: [UserService, LoginService],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		const limiter = () => rateLimit({
			windowMs: 10 * 60 * 1000,
			max: 5,
		});

		// consumer
		// 	// .apply(limiter())
		//
		// consumer
		// 	// .apply(limiter())
		// 	.forRoutes('user/login/authorize');
	}
}
