import { Injectable } from '@nestjs/common';
import { NestContainer } from '@nestjs/core';

@Injectable()
export class AppService {
	show(): string {
		return 'jebana kontrola bledow';
	}

	async getAppSalt(): Promise<string> {
	}
}
