import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Recaptcha } from '@/packages/recaptcha/src';
import { LoginUserDto } from '@/user/dto/login-user.dto';
import { LoginTwoFactorStore } from '@/user/login-two-factor.store';
import CompositeTokenDto from '@/user/dto/composite-token.dto';

@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly loginTwoFactorStore: LoginTwoFactorStore,
	) {
	}

	@Recaptcha()
	@Post('login')
	async login(@Body() data: LoginUserDto): Promise<CompositeTokenDto> {
		const token = this.loginTwoFactorStore.generateLoginCompositeToken(data.email, true);

		return token;
	}
}

