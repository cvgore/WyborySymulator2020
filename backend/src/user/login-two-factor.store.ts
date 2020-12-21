import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import CompositeTokenDto from '@/user/dto/composite-token.dto';

@Injectable()
export class LoginTwoFactorStore {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private config: ConfigService,
	) {
	}

	async generateLoginCompositeToken(email: string, fake: boolean = false): Promise<CompositeTokenDto> {
		const token = uuidv4();
		const ts = +new Date();
		const composite: CompositeTokenDto = {token, ts};

		if (!fake) {
			await this.cacheManager.set(`ltf:${token}`, composite, {
				ttl: this.config.get<number>('auth.magicLink.lifetime')!
			});
		}

		return composite;
	}
}
