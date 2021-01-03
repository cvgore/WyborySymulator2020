import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {
	}

	async login(user: User) {
		const payload = {username: user.email, sub: user.safeId};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
