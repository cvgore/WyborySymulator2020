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

	private cacheKey(email: string, ts: number): string {
		const hashedEmail = this.hasher().update(email).digest().toString('hex');
		const descriptor = ts.toString(16);

		return `ltf:${hashedEmail}:${descriptor}`;
	}

	private hasher() {
		return crypto.createHmac('md5', this.config.get<string>('crypto.appSecret')!);
	}

	public async generateLoginCompositeToken(email: string): Promise<CompositeToken> {
		const token = uuidv4();
		const ts = +new Date();
		const composite: CompositeToken = {token, ts};

		await this.cacheManager.set(this.cacheKey(email, ts), composite, {
			ttl: this.config.get<number>('auth.magicLink.lifetime')!
		});

		return composite;
	}

	public async verifyCompositeToken(email: string, composite: CompositeToken): Promise<true> {
		const key = this.cacheKey(email, composite.ts);

		const storedComposite = await this.cacheManager.get<string>(key);

		if (!CompositeToken.equals(storedComposite, composite)) {
			throw new InvalidCompositeToken();
		}

		// Removing verified composite token, so no longer can be used to log in
		await this.cacheManager.del(key);

		return true;
	}
}
