import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Recaptcha } from '@/packages/recaptcha/src';
import { RequestLoginDto } from '@/user/dto/request-login.dto';
import { LoginService } from '@/user/login.service';
import { LoginCompositeTokenDto } from '@/user/dto/login-composite-token.dto';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/user.entity';
import { JwtGuard } from '@/auth/guards/jwt.guard';

@Controller('user/')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly loginService: LoginService,
		private readonly authService: AuthService,
	) {
	}

	@Recaptcha()
	@Post('login/request')
	async requestLogin(@Body() data: RequestLoginDto): Promise<void> {
		const composite = await this.loginService.generateLoginCompositeToken(data.email);

		await this.userService.sendLoginEmail(data.email, composite);
	}

	@Recaptcha()
	@Post('login/authorize')
	async authorize(@Body() data: LoginCompositeTokenDto): Promise<object> {
		await this.loginService.verifyCompositeToken(data.email, {
			token: data.token,
			ts: data.ts,
		});

		const user = await this.userService.findByEmailOrCreate(data.email);

		return await this.authService.login(user);
	}

	@UseGuards(JwtGuard)
	@Get('me')
	async me(@Request() req: any): Promise<User> {
		return req.user;
	}
}

