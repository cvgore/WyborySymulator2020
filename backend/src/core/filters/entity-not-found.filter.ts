import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		response
			.status(404)
			.json({});
	}
}
