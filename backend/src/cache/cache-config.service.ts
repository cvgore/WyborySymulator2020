import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// @ts-ignore
import * as RedisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
	constructor(
		private config: ConfigService
	) {
	}

	async createCacheOptions(): Promise<CacheModuleOptions> {
		return {
			store: RedisStore,
			host: this.config.get<string>('redis.host'),
			port: this.config.get<number>('redis.port'),
			db: this.config.get<number>('redis.db'),
			password: this.config.get<string>('redis.pass'),
		};
	}
}
