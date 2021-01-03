import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(
		private userService: UserService,
	) {
		super();
	}
	serializeUser(user: any, done: (err: Error, user: any) => void): any {
		done(null, user.id);
	}
	deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
		this.userService.findByEmailOrCreate()
		done(null, payload);
	}
}
