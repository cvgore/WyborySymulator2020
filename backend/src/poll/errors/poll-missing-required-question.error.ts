import { HttpException, HttpStatus } from '@nestjs/common';

export class PollMissingRequiredQuestionError extends HttpException {
	constructor() {
		super('Poll must contain at least 1 required question', HttpStatus.BAD_REQUEST);
	}
}
