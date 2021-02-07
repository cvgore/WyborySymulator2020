import { HttpException, HttpStatus } from '@nestjs/common';

export class PollNotPublishedError extends HttpException {
	constructor() {
		super('Poll is not published', HttpStatus.BAD_REQUEST);
	}
}
