import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HcaptchaModule } from '../packages/recaptcha/src';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		HcaptchaModule.forRoot({
			secretKey: process.env.HCAPTCHA_SECRET_KEY as string,
			response: req => req.headers['X-Captcha-Response'],
			skipIf: process.env.NODE_ENV !== 'production',
		}),
		UserModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
