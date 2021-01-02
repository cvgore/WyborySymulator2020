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
		const tokenShouldBeFake = !await this.userService.existsByEmail(data.email);

		return this.loginService.generateLoginCompositeToken(data.email, tokenShouldBeFake);
	}

	@Recaptcha()
	@Post('login/authorize')
	async login(@Body() data: LoginCompositeTokenDto): Promise<boolean> {
		await this.loginService.verifyCompositeToken(data.email, {
			token: data.token,
			ts: data.ts,
		});

		return true;
	}
}

