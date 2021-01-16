import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService
	) {
	}

	async login(user: User) {
		const payload = {
			username: user.email,
			sub: user.id,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
