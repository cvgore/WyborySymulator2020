import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Recaptcha } from '@/packages/recaptcha/src';
import { RequestLoginDto } from '@/user/dto/request-login.dto';
import { LoginService } from '@/user/login.service';
import CompositeToken from '@/user/composite-token';
import { LoginCompositeTokenDto } from '@/user/dto/login-composite-token.dto';

@Controller('user/')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly loginService: LoginService,
	) {
	}

	@Recaptcha()
	@Post('login/request')
	async requestLogin(@Body() data: RequestLoginDto): Promise<CompositeToken> {
		return this.loginService.generateLoginCompositeToken(data.email);
	}

	@Recaptcha()
	@Post('login/authorize')
	async login(@Body() data: LoginCompositeTokenDto): Promise<undefined> {
		await this.loginService.verifyCompositeToken(data.email, {
			token: data.token,
			ts: typeof data.ts === 'string' ? parseInt(data.ts) : data.ts,
		});

		const user = await this.userService.findByEmailOrCreate(data.email);

		return undefined;
	}
}

