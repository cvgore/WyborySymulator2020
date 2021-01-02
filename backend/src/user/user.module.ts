import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { LoginService } from '@/user/login.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheConfigService } from '@/cache/cache-config.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		CacheModule.registerAsync({
			imports: [ConfigModule],
			// FIXME: useExisting should work and is much more expected there, but for some reason it does not work
			useClass: CacheConfigService,
		})
	],
	controllers: [UserController],
	providers: [UserService, LoginService],
})
export class UserModule {
}
