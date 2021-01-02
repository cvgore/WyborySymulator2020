import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import CompositeToken from '@/user/composite-token';
import * as crypto from 'crypto';
import { InvalidCompositeToken } from '@/user/errors/invalid-composite-token';

@Injectable()
export class LoginService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private config: ConfigService,
	) {
	}

	private cacheKey(email: string): string {
		const hashedEmail = this.hasher().update(email).digest().toString('hex');

		return `ltf:${hashedEmail}`;
	}

	private hasher() {
		return crypto.createHmac('md5', this.config.get<string>('crypto.appSecret')!);
	}

	async generateLoginCompositeToken(email: string, fake: boolean = false): Promise<CompositeToken> {
		const token = uuidv4();
		const ts = +new Date();
		const composite: CompositeToken = {token, ts};

		if (!fake) {
			const cacheKey = this.cacheKey(email);

			await this.cacheManager.set(cacheKey, composite, {
				ttl: this.config.get<number>('auth.magicLink.lifetime')!
			});
		}

		return composite;
	}

	async verifyCompositeToken(email: string, composite: CompositeToken): Promise<true> {
		try {
			const storeComposite = await this.cacheManager.get<string>(this.cacheKey(email));

			if (!CompositeToken.equals(storeComposite, composite)) {
				throw new InvalidCompositeToken();
			}

			return true;
		} catch (ex) {
			console.log(ex);
			throw new InvalidCompositeToken();
		}
	}
}
