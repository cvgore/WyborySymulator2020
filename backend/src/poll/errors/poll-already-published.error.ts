import { HttpException, HttpStatus } from '@nestjs/common';

export class PollAlreadyPublishedError extends HttpException {
	constructor() {
		super('Poll is already published', HttpStatus.BAD_REQUEST);
	}
}
