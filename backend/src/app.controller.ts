import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Router } from 'express';

@Controller('')
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get('routes')
	async routes(@Req() request: Request): Promise<object> {
		const router = request.app._router as Router;

		return router.stack.map((layer) => {
			if (layer.route) {
				const path = layer.route.path;
				const method = layer.route.stack[0].method;

				return `${method.toUpperCase()} ${path}`;
			}
		}).filter((v) => v !== null);
	}
}

